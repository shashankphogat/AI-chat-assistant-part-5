import express from "express";
import identifyUser from "../middlewares/auth.middleware.js";
import { sendMessageController, getChatsController,getMessagesController,deleteChatController } from "../controllers/chat.controller.js";

let chatRoutes=express.Router();

chatRoutes.post("/message",identifyUser,sendMessageController);

chatRoutes.get("/",identifyUser, getChatsController);

chatRoutes.get("/:chatId/messages",identifyUser,getMessagesController);

chatRoutes.delete("/delete/:chatId",identifyUser,deleteChatController);

export default chatRoutes