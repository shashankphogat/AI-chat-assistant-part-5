import React from 'react'
import { sendMessage,getChats,getMessages,deleteChat } from '../services/chat.api.js'
import { setChats, setIsLoading, setCurrentChatId,setError, addNewMessage, createNewChat, addMessages, stateDeleteChat } from "../chat.slice.js"
import {useDispatch} from "react-redux"
import { initializeSocketConnection } from '../services/chat.socket.js'

const useChat = () => {
    const dispatch=useDispatch();  

    async function handleSendMessage(message,chatId){
        try{
        dispatch(setIsLoading(true));
        const data =await sendMessage(message, chatId);
        const {chat,aiMessage}=data;
        if(!chatId){
        dispatch(createNewChat({
            chatId:chat._id,
            title:chat.title
        }
        ))
    }
        dispatch(addNewMessage({
            chatId:chat._id,
            content:message,
            role:"user"
        }))
         dispatch(addNewMessage({
            chatId:chat._id,
            content:aiMessage.content,
            role:aiMessage.role
        }))
        dispatch(setCurrentChatId(chat._id));
    }
    catch(err){
        dispatch(setError(err?.response?.data?.message || "message failed to send"));
    }
    finally{
        dispatch(setIsLoading(false));
    }
}

async function handleGetChats(message,chatId){
    try{
    dispatch(setIsLoading(true))
    let response = await getChats();
    let{chats}=response;
    dispatch(setChats(chats.reduce((acc,chat)=>{
        acc[chat._id]={
            id:chat._id,
            title:chat.title,
            messages:[]
        }
        return acc
    },{})))
    }
    catch(err){
        dispatch(setError(err?.response?.data?.message || "failed to get chats"))
    }
    finally{
        dispatch(setIsLoading(false));
    }

}

async function handleOpenChat(chatId){
    try{
        dispatch(setIsLoading(true));
        let response=await getMessages(chatId);
        let {messages}=response;
        let formattedMessages=messages.map((message)=>{
            return {content:message.content,
            role:message.role}
        })
        dispatch(addMessages({chatId,messages:formattedMessages}))
        dispatch(setCurrentChatId(chatId))
    }
    catch(err){
        dispatch(setError(err?.response?.data?.message || "chat failed to load"));
    }
    finally{
        dispatch(setIsLoading(false))
    }
}

async function handleOpenNewChat(){
    try{
        dispatch(setIsLoading(true))
        dispatch(setCurrentChatId(null));
    }
    catch(err){
        dispatch(setError(err?.response?.data?.message || "failed to open new chat"));
    }
    finally{
        dispatch(setIsLoading(false))
    }
}

async function handleDeleteChat(chatId){
    try{
        dispatch(setIsLoading(true))
        await deleteChat(chatId);
        dispatch(stateDeleteChat(chatId));
    }
    catch(err){
        dispatch(setError(err?.response?.data?.message || "failed to delete chat"));
    }
    finally{
        dispatch(setIsLoading(false));
    }

}

  return {
    handleSendMessage,
    handleGetChats,
    handleOpenChat,
    handleOpenNewChat,
    handleDeleteChat,
    initializeSocketConnection
  }
}

export default useChat