import { Router } from "express";
import { userManager } from "../dao/managers/userManager.js";
import passport from "../middlewares/passport.mid.js";

const router = Router();

const manager = new userManager();

router.get('/', async(req,res,next)=>{
    const users = await manager.readAllUsers();
    res.status(200).send({users})
})

router.post('/register', passport.authenticate("register",{session:false}), register)
router.post('/login', passport.authenticate("login", {session: false}), login)
/*router.post('/online', )
router.post('/logout', )
router.post('/isadmin',)
router.get('/google', )
router.get('/google/cb',) 
*/

function register(req,res,next){
    try {
        const message = "USER REGISTERED";
        const newUser = req.user;
        return res.status(201).json({message, newUser});
    } catch (error) {
        return next(error);
    }
}

function login(req,res,next){
    try {
        const message = "USER LOGGED";
        const user = req.user;
        const {token} = req;
        const cookieOpts = {maxAge: 60*60*24*1000, httpOnly: true, signed: true};
        return res.status(200).cookie('token', token, cookieOpts).json({message, user});
    } catch (error) {
        return next(error);
    }
}


export default router