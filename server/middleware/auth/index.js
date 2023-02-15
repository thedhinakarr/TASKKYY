import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (payload)=>{
    try {
        const token = jwt.sign(payload,config.get(`JWT_SECRET`),{expiresIn:`24h`});
        return token;
    } catch (error) {
        console.log(error);
        return;
    }
};

const isAuthenticated = (req,res,next)=>{
    try {
        let token = req.headers["auth-token"];
        let payload = jwt.verify(token,config.get("JWT_SECRET"));
        console.log(payload);
        req.payload = payload;
        return next();
    } catch (error) {
        console.error(error);
        res.status(401).json({error:"Invalid Token/Token expired"});
    }
};

export {isAuthenticated,generateToken};

