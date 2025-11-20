import crypto from 'crypto';

export function getNewVerificationCode(){
    return crypto.randomBytes(3).toString("hex");
}