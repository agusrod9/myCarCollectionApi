import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { usersManager } from "../dao/managers/usersManager.js";
import { globalStatsManager } from "../dao/managers/globalStats.manager.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import { sendVerificationEmail } from "../utils/resend.mailer.js";
import { generateNickName } from "../utils/nicknames.util.js";
import { validateEmail } from "../utils/validator.util.js";
import { getHighResGooglePhoto } from "../utils/googlePhotoResChange.util.js";
import { getNewVerificationCode } from "../utils/verificationCode.util.js";

const userManager = new usersManager();
const globalStatManager = new globalStatsManager()
const { SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, API_BASE_URL } = process.env;

passport.use("jwt", new jwtStrategy({jwtFromRequest: ExtractJwt.fromExtractors([
      (req) => req?.signedCookies?.token,
    ]),
    secretOrKey: SECRET,
    },
    async(data, done)=>{
      try {
        if(!data?.user_id){
          return done(null, false);
        }
        const userId = data.user_id;
        const user = await userManager.readById(userId);
        if (!user) {
          return done(null,false);
        }
        if(!user.active){
          return done(null,false)
        }
        const userBasicInfo = {userId : user._id, role: user.role}
        return done(null, userBasicInfo)
      } catch (error) {
        return done(error)
      }
    } 
))

passport.use(
  "register",
  new localStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      const one = await userManager.readByEmail(email);
      if (one) {
        let error;
        if(one.googleId){
          error = new Error("USER ALREADY REGISTERED WITH GOOGLE");
        }else{
          error = new Error("USER ALREADY REGISTERED");
        }
        error.statusCode = 401;
        return done(error);
      } else if (!validateEmail(req.body.email)) {
        const error = new Error("INVALID E-MAIL ADDRESS");
        error.statusCode = 401;
        return done(error);
      } else {
        const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
        const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
        const geo = await geoRes.json();
        const country = geo.country_name;
        req.body.password = createHash(password);
        let userData = req.body;
        const verificationCode = getNewVerificationCode();
        const nickName = generateNickName();
        const globalStats = await globalStatManager.getStatsAndUpdateCounters();
        const registrationNumber = globalStats.totalUsers; //Ya obtiene el siguiente al último por getStatsAndUpdateCounters ($inc totalUsers)
        userData = { ...userData, verificationCode, nickName, registrationNumber, country };
        const newUsr = await userManager.createUser(userData);
        await sendVerificationEmail(newUsr.email, verificationCode);
        return done(null, newUsr);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      const user = await userManager.readByEmail(email);
      if (!user) {
        const error = new Error("USER NOT FOUND");
        error.statusCode = 401;
        return done(error);
      } else if (!user.verifiedUser) {
        const error = new Error("USER MUST VERIFY MAIL FIRST");
        error.statusCode = 401;
        return done(error);
      } else if (!user.active) {
        const error = new Error("USER NO LONGER ACTIVE");
        error.statusCode = 401;
        return done(error);
      } else if(user.googleId){
        const error = new Error("USER MUST LOGIN USING GOOGLE");
        error.statusCode = 401;
        return done(error);
      } else {
        let verifies = false;
        if (user.mustResetPass) {
          verifies = password == user.password;
        } else {
          verifies = verifyHash(password, user.password);
        }
        if (verifies) {
          req.token = createToken({ user_id: user._id, role: user.role });
          return done(null, user);
        } else {
          const error = new Error("INVALID CREDENTIALS");
          error.statusCode = 401;
          return done(error);
        }
      }
    }
  )
);

passport.use(
  "logout",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.signedCookies?.token,
      ]),
      secretOrKey: SECRET,
    },
    (data, done) => {
      const userId = data.user_id;
      return done(null, { _id: userId });
    }
  )
);

passport.use(
  "whoIsOnline",
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req) => req?.signedCookies?.token,
      ]),
      secretOrKey: SECRET,
    },
    (data, done) => {
      const userId = data.user_id;
      return done(null, userId);
    }
  )
);

passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      passReqToCallback: true,
      callbackURL: `${API_BASE_URL}sessions/google/cb`,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const { id, given_name, family_name, picture, email } = profile;
        let user = await userManager.readByEmail(email);
        if (!user) {
          const nickName = generateNickName();
          const globalStats = await globalStatManager.getStatsAndUpdateCounters();
          const registrationNumber = globalStats.totalUsers; //Ya obtiene el siguiente al último por getStatsAndUpdateCounters ($inc totalUsers)
          const highResPicture = getHighResGooglePhoto(picture)
          const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
          const geoRes = await fetch(`https://ipapi.co/${ip}/json/`);
          const geo = await geoRes.json();
          const country = geo.country_name;
          user = await userManager.createUser({
            email,
            googleId: id,
            password: createHash(id),
            firstName: given_name,
            lastName: family_name,
            profilePicture: highResPicture,
            verifiedUser: true,
            nickName,
            registrationNumber,
            active: true,
            country
          });
        }
        req.token = createToken({ user_id: user._id, role: user.role });
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

export default passport;
