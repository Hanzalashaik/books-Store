import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import config from "config"

let authMiddleware = (req,res,next) =>{
    try {
        let token = req.headers["access-token"] || req.headers["authorization"];
        if(!token){
            return res.status(401).json({msg:"Please Token diyo"})
        }
        let decrypt = CryptoJS.AES.decrypt(token,config.get("CRYPTOKEY"));
        const originalText=decrypt.toString(CryptoJS.enc.Utf8);

        let verify=jwt.verify(originalText,config.get("JWTKEY"));

        console.log(verify);
        req.user=verify
        next();       
        
    } catch (error) {
        res.status(500).json({msg:"JWT Token ka time hogaya"})
    }
}

 export default authMiddleware;