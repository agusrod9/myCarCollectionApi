import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { usersManager } from "../dao/managers/usersManager.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import crypto from "crypto";
import { sendVerificationEmail } from "../utils/resend.mailer.js";
import { generateNickName } from "../utils/nicknames.util.js";
import { validateEmail } from "../utils/validator.util.js";

const manager = new usersManager();
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
        const user = await manager.readById(userId);
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
      const one = await manager.readByEmail(email);
      if (one) {
        const error = new Error("USER ALREADY REGISTERED");
        error.statusCode = 401;
        return done(error);
      } else if (!validateEmail(req.body.email)) {
        const error = new Error("INVALID E-MAIL ADDRESS");
        error.statusCode = 401;
        return done(error);
      } else {
        req.body.password = createHash(password);
        let userData = req.body;
        const verificationCode = crypto.randomBytes(12).toString("hex");
        const nickName = generateNickName();
        userData = { ...userData, verificationCode, nickName };
        const newUsr = await manager.createUser(userData);
        await sendVerificationEmail(newUsr.contactEmail, verificationCode);
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
      const user = await manager.readByEmail(email);
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
        let user = await manager.readByEmail(id);
        if (!user) {
          const nickName = generateNickName();
          user = await manager.createUser({
            email: id,
            password: createHash(id),
            firstName: given_name,
            lastName: family_name,
            profilePicture: picture,
            contactEmail: email,
            verifiedUser: true,
            nickName,
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
