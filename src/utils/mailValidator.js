import validator from 'validator';

export const verifyEmail = (eMail)=>{
    return validator.isEmail(eMail);
}