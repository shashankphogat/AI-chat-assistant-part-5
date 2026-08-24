import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./features/chat/chat.slice.js"
import authReducer from "./features/authentication/auth.slice.js"

export const store = configureStore({
    reducer:{
        chat:chatReducer,
        auth:authReducer
    }
})