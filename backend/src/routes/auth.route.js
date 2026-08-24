import express from "express";
import {loginController, registerController, getMeController, logoutController} from "../controllers/auth.controller.js"
import identifyUser from "../middlewares/auth.middleware.js";

let userRoutes=express.Router();

userRoutes.post("/login",loginController)

userRoutes.post("/register",registerController)

userRoutes.get("/getMe",identifyUser,getMeController)

userRoutes.post("/logout",identifyUser,logoutController)

export default userRoutes