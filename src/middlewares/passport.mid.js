import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { ExtractJwt, Strategy as jwtStrategy } from "passport-jwt";
import { userManager } from "../dao/managers/userManager.js";
import { createHash, verifyHash } from "../utils/hash.util.js";
import { createToken } from "../utils/token.util.js";

const manager = new userManager;
const {SECRET} = process.env;

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
            const userData = req.body;
            const newUsr = await manager.createUser(userData);
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

export default passport;