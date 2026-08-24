import axios from "axios";

const api=axios.create({
    baseURL:"/api/chat",
    withCredentials:true
})

async function sendMessage(message,chatId){

    let response=await api.post("/message",{message,chatId});
    return response.data;

}

async function getChats(){
     let response=await api.get("/");
    return response.data;
}

async function getMessages(chatId){
     let response=await api.get(`${chatId}/messages`);
    return response.data;
}

async function deleteChat(chatId){
     let response=await api.delete(`delete/${chatId}`);
    return response.data;
}

export {
    sendMessage,getChats,getMessages, deleteChat
}