const {NODE_ENV} = process.env
const cookieName = NODE_ENV ==='production'
    ? "tdc_token"
    : "tdc_token_dev"

export default function isOnlineVerifier(req,res,next){
    if(req.signedCookies[cookieName]){        
        return next();
    }
    const error = new Error('USER IS NOT LOGGED IN');
    error.statusCode = 401;
    return next(error);
};