import passport from "passport";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import { userManager } from "../dao/managers/userManager.js";
import { createHash } from "../utils/hash.util.js";

const manager = new userManager;

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

export default passport;