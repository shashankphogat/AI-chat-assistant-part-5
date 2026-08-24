import {createSlice} from "@reduxjs/toolkit";

const chatSlice=createSlice({
    name:"chat",
    initialState:{
        chats:{},
        currentChatId:null,
        isLoading:false,
        error:null
    },
    reducers:{
        createNewChat:(state,action)=>{
            let{chatId,title}=action.payload;
            state.chats[chatId]={
                id:chatId,
                title,
                messages:[
                ]
            }
        },
        addNewMessage:(state,action)=>{
            let{chatId,role,content}=action.payload;
            state.chats[chatId].messages.push({content,role});
        },
        addMessages:(state,action)=>{
            let {chatId,messages}=action.payload;
            state.chats[chatId].messages=messages;
            state.currentChatId=chatId;
        },
        stateDeleteChat:(state,action)=>{
            let chatId=action.payload;
            delete state.chats[chatId];
        },
        setChats:(state,action)=>{
            state.chats=action.payload
        },
        setCurrentChatId:(state,action)=>{
            state.currentChatId=action.payload
        },
        setIsLoading:(state,action)=>{
            state.isLoading=action.payload
        },
        setError:(state,action)=>{
            state.error=action.payload
        }
    }
}
)

export const {setChats, setCurrentChatId, setIsLoading, setError, createNewChat, addNewMessage, addMessages, stateDeleteChat} = chatSlice.actions;

export default chatSlice.reducer;

