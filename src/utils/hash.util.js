import { genSaltSync, hashSync, compareSync } from "bcrypt";

function createHash(pwd){
    const salt = genSaltSync(11);
    const hashedPwd = hashSync(pwd,salt);
    return hashedPwd;
};

function verifyHash(pwd, hashedPwdFromDb){
    const verifies = compareSync(pwd, hashedPwdFromDb);
    return verifies;
}


export {createHash, verifyHash};