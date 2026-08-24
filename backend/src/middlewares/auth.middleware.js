import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import redis from "../config/cache.js"
dotenv.config();

export default async function identifyUser(req,res,next){
     let token = req.cookies.token;
    if(!token){
        return res.status(401).json(
            {message:"user needs to log in"})
    }
    let key = `AIchatassistant:blacklist:${token}`;
    let isTokenBlacklisted=await redis.get(key);
    if(isTokenBlacklisted){
        return res.status(402).json({message:"invalid credentials"});
    }
    let decoded;
    try{
    decoded=jwt.verify(token,process.env.JWT_SECRET);
    }
    catch(error){
        return res.status(403).json({message:"user not authorized"})
    }
    req.user=decoded;
    next();
}