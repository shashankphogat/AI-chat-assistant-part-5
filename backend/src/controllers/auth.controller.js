import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import redis from "../config/cache.js"

dotenv.config();


async function loginController(req,res){
    let {username,email,password}=req.body;
    
    let data=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    }).select("+password");
    if(!data){
        return res.status(409).json(
            {message:"user needs to register"
    })
    }
    let passwordCorrect=await bcrypt.compare(password,data.password);
    if(!passwordCorrect){
         return res.status(401).json(
            {message:"invalid password"})
    }
    let token=jwt.sign({
            id:data._id,
            username:data.username
        },process.env.JWT_SECRET,
    {
        expiresIn:"1d"
    })
    res.cookie("token",token);
    res.status(200).json({message:"user logged in",
        data:{
            id:data._id,
            username:data.username,
            email:data.email
        }
    })

}

async function registerController(req,res){
    let {username,email,password}=req.body;
    let userData=await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })
    if(userData){
        return res.status(409).json({
            message:"user already present with this "+ (userData.username===username?
            "username":"email")
    })}
    let hash=await bcrypt.hash(password,10);
    let data=await userModel.create({
        username,
        password:hash,
        email
    })
    let token=jwt.sign({
        id:data._id,
        username:data.username
    },process.env.JWT_SECRET,{
        expiresIn:"1d"
    });
    res.cookie("token",token);
    res.status(201).json({
        message:"user registered successfully",
        data:{
            id:data._id,
            username:data.username,
            email:data.email
        }
    })

}

async function getMeController(req,res){
    let id=req.user.id;
    let data = await userModel.findOne({
        _id:id
    }).select("-password")
    res.status(200).json({
        message:"user data retrieved successfully.",
        data
    })
}

async function logoutController(req,res){
    res.clearCookie("token");
    let token = req.cookies.token;
    const key = `AIchatassistant:blacklist:${token}`;
    await redis.set(key,Date.now().toString(),"EX", 60*60)
    console.log("token added to redis");
    res.status(200).json({
        message:"user logged out successfully",
    })
}

export {
    loginController,
    registerController,
    getMeController,
    logoutController
}