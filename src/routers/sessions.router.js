import { Router } from "express";
import { usersManager } from "../dao/managers/usersManager.js";
import { carManager } from "../dao/managers/carsManager.js";
import passport from "../middlewares/passport.mid.js";
import isOnlineVerifier from "../middlewares/isOnlineVerifier.mid.js";
import { createLogoutToken } from "../utils/token.util.js";
import verifyCode from "../middlewares/usersVerifier.mid.js";
import crypto from 'crypto';
import { sendNewPasswordEmail } from "../utils/resend.mailer.js";
import { createHash } from "../utils/hash.util.js";

const router = Router();
const manager = new usersManager();
const cManager = new carManager();

router.post('/register', passport.authenticate("register",{session:false}), register);
router.post('/login', passport.authenticate("login", {session: false}), login);
router.post('/online', isOnlineVerifier, online);
router.post('/whoIsOnline', passport.authenticate("whoIsOnline", {session:false}), whoIsOnline);
router.post('/onlineUserData', passport.authenticate("whoIsOnline", {session: false}), onlineUserData);
router.post('/logout', passport.authenticate("logout", {session:false}), logout);
router.post('/verify', verifyCode, verifiCodeResponse);
router.post('/resetPass', resetPass);
router.post('/changePass', changePass, changePassResponse);
router.get('/google', passport.authenticate("google", {scope: ['email', 'profile']}));
router.get('/google/cb', passport.authenticate("google", {session: false}), google); 


function register(req,res,next){
    try {
        const message = 'USER REGISTERED';
        const newUser = req.user;
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
        const cookieOpts = {maxAge: 60*60*24*1000, httpOnly: true, signed: true, secure: true, sameSite: "None"};
        return res.status(200).cookie('token', token, cookieOpts).json({message, user : user.email, mustResetPass : user.mustResetPass});
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
        const userCarCount = await cManager.readUserCarCount(userId)
        const amountByCurrency = await cManager.readUserCarsTotalAmount(userId)

        return res.status(200).json({message, userId, mustResetPass: user.mustResetPass, userName : user.nickName, userProfilePicture : user.profilePicture, userCarCount, amountByCurrency, role: user.role, mainCurrency : user.settings.mainCurrency, laguage: user.settings.languaje, darkMode: user.settings.darkMode });
        
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
        const cookieOpts = {httpOnly: true, signed: true, secure: true, sameSite: "None"};
        const message = 'USER LOGGED OUT';
        req.token = createLogoutToken({user_id: user._id, role: user.role});
        req.user = null;
        return res.status(200).clearCookie("token", cookieOpts).json({message});
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

function google(req, res, next){
    try {
        const message = 'USER LOGGED';
        const {token} = req;
        const cookieOpts = {maxAge: 60*60*24*1000, httpOnly: true, signed: true, secure: true, sameSite: "None"};

        res.cookie('token', token, cookieOpts);
        return res.redirect("https://jovial-medovik-6efedb.netlify.app");
    } catch (error) {
        return next(error);
    }
}

function verifiCodeResponse(req,res,next){
    try {
        const message = 'USER VERIFIED';
        return res.status(200).json({message});
    } catch (error) {
        return next(error);
    }
}

export default router