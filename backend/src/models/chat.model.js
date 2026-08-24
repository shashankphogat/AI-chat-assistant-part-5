import mongoose from "mongoose";

let chatSchema=mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    user:{
        type:String,
        required:true
    }
})

let chatModel = mongoose.model("chat",chatSchema)

export default chatModel