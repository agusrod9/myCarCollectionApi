import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { carManager } from "../dao/managers/cars.manager.js";
import passport from "../middlewares/passport.mid.js";
import isOnlineVerifier from "../middlewares/isOnlineVerifier.mid.js";
import { createLogoutToken } from "../utils/token.util.js";
import verifyCode from "../middlewares/usersVerifier.mid.js";
import crypto from 'crypto';
import { sendNewPasswordEmail } from "../utils/resend.mailer.js";
import { createHash } from "../utils/hash.util.js";
import { verifyLimiter } from "../middlewares/rateLimiter.mid.js";
import { getNewVerificationCode } from "../utils/verificationCode.util.js";
import { updateCountriesStats } from "../services/globalStats.service.js";

const router = Router();
const manager = new usersManager();
const cManager = new carManager();
const{FRONT_URL, NODE_ENV} = process.env

const cookieDomain = NODE_ENV === "production" 
    ? ".thediecaster.com"
    : ".dev.thediecaster.com";

const cookieName = NODE_ENV ==='production'
    ? "tdc_token"
    : "tdc_token_dev"

router.post('/register', passport.authenticate("register",{session:false}), register);
router.post('/login', passport.authenticate("login", {session: false}), login);
router.post('/online', isOnlineVerifier, online);
router.post('/whoIsOnline', passport.authenticate("whoIsOnline", {session:false}), whoIsOnline);
router.post('/onlineUserData', passport.authenticate("whoIsOnline", {session: false}), onlineUserData);
router.post('/logout', passport.authenticate("logout", {session:false}), logout);
router.post('/getVerificationCode', verifyLimiter, getVerificationCode);
router.post('/verify', verifyLimiter ,verifyCode, verifyCodeResponse);
router.post('/resetPass', resetPass);
router.post('/changePass', changePass, changePassResponse);
router.get('/google', passport.authenticate("google", {scope: ['email', 'profile']}));
router.get('/google/cb', passport.authenticate("google", {session: false}), google); 


async function register(req,res,next){
    try {
        const message = 'USER REGISTERED';
        const newUser = req.user;
        if(newUser.country){
            await updateCountriesStats(newUser.country)
        }
        return res.status(201).json({message, newUser});
    } catch (error) {
        return next(error);
    }
}

function login(req,res,next){
    try {
        const message = 'USER LOGGED';
        const user = req.user;
        const {token} = req;
        const cookieOpts = {maxAge: 60*60*24*1000, httpOnly: true, signed: true, secure : true, sameSite: "None", domain : cookieDomain, path : '/'};
        return res.status(200).cookie(cookieName, token, cookieOpts).json({message, user : user.email, mustResetPass : user.mustResetPass});
    } catch (error) {
        return next(error);
    }
}

function online(req, res, next) {
    try {
        const message = 'USER ONLINE';
        return res.status(200).json({message});
        
    } catch (error) {
        return next(error);
    }
}

async function whoIsOnline(req, res, next) {
    try {
        const message = 'USER ONLINE';
        const userId = req.user;
        const user = await manager.readById(userId);
        const userCarCount = await cManager.readUserCarCount(userId);
        const amountByCurrency = await cManager.readUserCarsTotalAmount(userId);
        const language = user.settings.language;

        return res.status(200).json({message, userId, mustResetPass: user.mustResetPass, userName : user.nickName, userProfilePicture : user.profilePicture, userCarCount, amountByCurrency, role: user.role, mainCurrency : user.settings.mainCurrency, laguage: user.settings.languaje, darkMode: user.settings.darkMode, userGoogleId : user.googleId, language});
        
    } catch (error) {
        return next(error);
    }
}

async function onlineUserData(req, res, next){
    try {
        const userId = req.user;
        const user = await manager.readById(userId);
        const safeUser = {
            id: user.id,
            email: user.email,
            firstName : user.firstName,
            lastName : user.lastName,
            nickName : user.nickName,
            profilePicture : user.profilePicture,
            role : user.role
        }
        return res.status(200).json({error : null, data : safeUser})
    } catch (error) {
        return next(error)
    }
}

async function logout(req, res, next){
    try {
        const userId = req.user;
        const user = await manager.readById(userId);
        const cookieOpts = {maxAge : 0,  httpOnly: true, signed: true, secure : true, sameSite: "None", domain : cookieDomain, path : '/'};
        const message = 'USER LOGGED OUT';
        //req.token = createLogoutToken({user_id: user._id, role: user.role});
        req.user = null;
        return res.status(200).cookie(cookieName, "", cookieOpts).json({message});
    } catch (error) {
        return next(error);
    }
}

async function resetPass (req,res,next){
    try {
        const {email} = req.body;
        const user = await manager.readByEmail(email);
        if(user){
            const newPass = crypto.randomBytes(4).toString('hex');
            await manager.updateUser(user._id, {password: newPass, mustResetPass:true})
            await sendNewPasswordEmail(user.email, newPass)
            const message = 'NEW PASSWORD SENT BY MAIL';
            return res.status(200).json({message});
        }
        const message = 'USER NOT FOUND';
        return res.status(404).json({message})
    } catch (error) {
        return next(error);
    }
}

async function changePass(req, res, next){
    try {
        const {email, password} = req.body;
        const user = await manager.readByEmail(email);
        const newPass = createHash(password);
        await manager.updateUser(user._id, {password: newPass, mustResetPass:false})
        return next();
    } catch (error) {
        return next(error);
    }
}

function changePassResponse(req, res, next){
    const message = 'PASSWORD SET';
    return res.status(200).json({message});
}

async function google(req, res, next){
    try {
        const {token} = req;
        const newUser = req.user
        const cookieOpts = {maxAge: 60*60*24*1000, httpOnly: true, signed: true, secure : true, sameSite: "None", domain : cookieDomain, path : '/'};
        res.cookie(cookieName, token, cookieOpts);
        if(newUser.country){
            await updateCountriesStats(newUser.country)
        }
        return res.redirect(`${FRONT_URL}/?loggedBy=google`);
    } catch (error) {
        return next(error);
    }
}

function verifyCodeResponse(req,res,next){
    try {
        const message = 'USER VERIFIED';
        return res.status(200).json({message});
    } catch (error) {
        return next(error);
    }
}

async function getVerificationCode(req,res,next){
    try {
        const {email} = req.query;
        if(!email){
            const message = 'MISSING MANDATORY FIELDS'
            return res.status(400).json({message})
        }
        const one = await manager.readByEmail(email);
        if(one){
            const verificationCode = getNewVerificationCode()
            const updated = await manager.updateUser(one._id, {verificationCode, active: false, verifiedUser : false})
            if(updated){
                const message = 'NEW VERIFICATION CODE SUCCESFULLY SET'
                return res.status(200).json({message, verificationCode})
            }else{
                const message = 'VERIFICATION CODE NOT SET. TRY AGAIN.'
                return res.status(500).json({message})
            }
        }else{
            const message = 'USER NOT FOUND';
            return res.status(404).json({message})
        }
    } catch (error) {
        return next(error)
    }
}

export default router