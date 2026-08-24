import mongoose from "mongoose";

let messageSchema=mongoose.Schema({
    role:{
        type:String,
        enum:["ai","user"],
        required:true
    },
    content:{type:String,
        required:true
    },
    chatId:{
        type:String,
        required:true
    }
})

let messageModel = mongoose.model("message",messageSchema)

export default messageModel