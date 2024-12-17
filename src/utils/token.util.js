import jwt from 'jsonwebtoken';

const {SECRET} = process.env;

function createToken(data){
    const token = jwt.sign(data,SECRET, {expiresIn: 60*60*24});
    return token;
}

function createLogoutToken(data){
    const token = jwt.sign(data,SECRET, {expiresIn: 1});
    return token;
}

function verifyToken(token){
    const verifies = jwt.verify(token, SECRET);
    return verifies;
}

export {createToken, createLogoutToken, verifyToken}