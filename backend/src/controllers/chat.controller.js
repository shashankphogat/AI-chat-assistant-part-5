import chatModel from "../models/chat.model.js";
import { generateResponse,generateChatTitle } from "../services/ai.service.js";
import messageModel from "../models/message.model.js";

async function sendMessageController(req,res){
    let message=req.body.message;
    let chatId=req?.body?.chatId;
    let chat=null;
    let title=null;
    if(!chatId){
        title = await generateChatTitle(message);
        chat = await chatModel.create({
            title,
            user:req.user.id
        })
    }
    else{
        chat=await chatModel.findOne({
            _id:chatId
        })
    }

    let userMessage = await messageModel.create({
        role:"user",
        content:message,
        chatId:chatId || chat._id 
    })

    let messages = await messageModel.find({
        chatId:chatId || chat._id 
    })
    
    let response = await generateResponse(messages);

    let aiMessage= await messageModel.create({
        role:"ai",
        content:response,
        chatId:chatId || chat._id
    })

    res.status(200).json({
        chat,
        userMessage,
        aiMessage
})
}

async function getMessagesController(req,res){

    let chatId=req.params.chatId;

    let chat=await chatModel.findOne({
        _id:chatId,
        user:req.user.id
    })

    if(!chat){
        res.status(404).json(
            {
                message:"chat not present for the user."
            }
        )
    }

    let messages=await messageModel.find({
            chatId
        }
    )

    res.status(200).json({
            message:"chats retrieved successfully",
            messages
        })
    }

async function getChatsController(req,res){
    let chats=await chatModel.find({
        user:req.user.id
    }
)

res.status(200).json({
    message:"chats retrieved successfully",
    chats
})
}

async function deleteChatController(req,res){
    let chatId=req.params.chatId;
   const chat = await chatModel.findOneAndDelete({
        _id:chatId,
        user:req.user.id
    }
)

  if(!chat){
    res.status(404).json(
        {
            message:"chat not present for the user."
        }
    )
}

  await messageModel.deleteMany({
        chatId
    })

  

res.status(200).json({
    message:"chat deleted successfully."
})
}

export {
    getChatsController,
    getMessagesController,
    deleteChatController,
    sendMessageController
}