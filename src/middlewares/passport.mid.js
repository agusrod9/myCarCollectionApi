import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { usersManager } from "../dao/managers/usersManager.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";
import crypto from 'crypto';
import { sendVerificationEmail } from "../utils/nodemailer.util.js";

const manager = new usersManager;
const {SECRET, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, API_BASE_URL} = process.env;

passport.use("register", new localStrategy(
    {passReqToCallback: true, usernameField:"email"},
    async(req, email, password, done)=>{
        const one = await manager.readByEmail(email);
        if(one){
            const error = new Error('USER ALREADY REGISTERED');
            error.statusCode = 401;
            return done(error);
        }else{
            req.body.password = createHash(password);
            let userData = req.body;
            const verificationCode = crypto.randomBytes(12).toString('hex');
            userData = {...userData, verificationCode};
            const newUsr = await manager.createUser(userData);
            await sendVerificationEmail(newUsr.contactEmail, verificationCode);
            return done(null, newUsr);
        }
    }
));

passport.use("login", new localStrategy(
    {passReqToCallback: true, usernameField: "email"},
    async(req, email, password, done)=>{
        const user = await manager.readByEmail(email);
        if(!user){
            const error = new Error("USER NOT FOUND");
            error.statusCode = 401;
            return done(error);
        }else if (!user.verifiedUser){
            const error = new Error('USER MUST VERIFY MAIL FIRST');
            error.statusCode= 401;
            return done(error);
        }else{
            const verifies = verifyHash(password, user.password);
            if(verifies){
                req.token = createToken({user_id : user._id, role : user.role});
                return done(null, user)
            }else{
                const error = new Error("INVALID CREDENTIALS");
                error.statusCode = 401;
                return done(error);
            }
        }
    }
));

passport.use("logout", new jwtStrategy(
    {jwtFromRequest: ExtractJwt.fromExtractors([req=>req?.signedCookies?.token]), secretOrKey: SECRET},
    (data, done)=>{
        const userId = data.user_id;
        return done(null, {_id: userId});
    }
));

passport.use("isPremium", new jwtStrategy(
    {jwtFromRequest: ExtractJwt.fromExtractors([req=>req?.signedCookies?.token]), secretOrKey: SECRET},
    (data, done)=>{
        const userId = data.user_id;
        if(data.role != "PREMIUM" && data.role != "SUPER"){
            const error = new Error('UNAUTHORIZED');
            error.statusCode = 403;
            return done(error);
        }
        return done(null, userId);
    }
));

passport.use("isSuper", new jwtStrategy(
    {jwtFromRequest: ExtractJwt.fromExtractors([req=>req?.signedCookies?.token]), secretOrKey: SECRET},
    (data, done)=>{
        const userId = data.user_id;
        if(data.role != "SUPER"){
            const error = new Error('UNAUTHORIZED');
            error.statusCode = 403;
            return done(error);
        }
        return done(null, userId);
    }
));

passport.use("google", new GoogleStrategy(
    {clientID: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET, passReqToCallback: true, callbackURL: `${API_BASE_URL}sessions/google/cb`},
    async(req, accessToken, refreshToken, profile, done)=>{
        try {
            const { id, given_name, family_name, picture, email } = profile;
            let user = await manager.readByEmail(id);            
            if(!user){
                user = await manager.createUser({email : id, password : createHash(id), firstName : given_name, lastName : family_name, profilePicture: picture, contactEmail : email });
            }
            req.token = createToken({user_id : user._id, role: user.role});
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }
));

export default passport;