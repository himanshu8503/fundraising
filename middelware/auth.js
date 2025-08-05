import { verifyToken } from "../services/athantification.js";

function AuthenticateToken(cookiName){
    return async (req,res,next) => {
        const token = req.cookies[cookiName];
        
        if(!token){
            return next();
        }

        try{
            const user = verifyToken(token);
            req.user = user;
        }catch(error){
        }

        return next();
    }
}

export default AuthenticateToken;

