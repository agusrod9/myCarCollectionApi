import validator from 'validator'

export const validateHexColor = (color)=>{
    return validator.isHexColor(color)
}

export const validateEmail = (eMail)=>{
    return validator.isEmail(eMail);
}
