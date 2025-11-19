import { usersManager } from "../dao/managers/usersManager.js";

const userManager = new usersManager();

async function verifyCode(req, res, next){
    const {email, verificationCode} = req.body;
    const user = await userManager.readByEmail(email); 
    let verifies = user.verificationCode === verificationCode;
    if(verifies){
        await userManager.updateUser(user._id, {verifiedUser : true, active : true})
        return next();
    }else{
        const error = new Error('CODE DOES NOT VERIFY');
        error.statusCode = 401;
        return next(error);
    }
}

export default verifyCode;