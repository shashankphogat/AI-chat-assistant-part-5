import mongoose from "mongoose";

let userSchema=mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

let userModel = mongoose.model("user",userSchema)

export default userModel