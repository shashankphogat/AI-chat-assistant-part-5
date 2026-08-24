import "../styles/chat.css"
import { useSelector } from 'react-redux'
import ReactMarkdown from "react-markdown";
import { useEffect } from 'react'
import useChat from "../hooks/useChat"
import { useState } from "react"
import useAuth from "../../authentication/hooks/useAuth.js"
import ConfirmDialog from "../components/confirmDialog.jsx"
import "../styles/dialog.css"

const Home = () => {

    const chats=useSelector(state=>state.chat.chats)
    const currentChatId=useSelector(state=>state.chat.currentChatId)
    const isLoading = useSelector(state => state.chat.isLoading);
    const chat = useChat();
    const [chatInput,setChatInput]=useState("")
    const currentUser=useSelector(state=>state.auth.user.data.username)
    const auth =useAuth();
    const [dialog, setDialog] = useState({
    open: false,
    type: null,
    chatId:null
});

    let error = useSelector(state=>state.chat.isError)

    useEffect(()=>{
        chat.initializeSocketConnection();
        chat.handleGetChats();
    },[])

    async function handleSubmit(e){
        e.preventDefault();
        await chat.handleSendMessage(chatInput,currentChatId);
        setChatInput("");
    }

    async function openChat(chatId){
        if(currentChatId!==chatId){
            await chat.handleOpenChat(chatId);
        }   
    }

    async function openNewChat(){
        await chat.handleOpenNewChat();
    }

    function openDeleteDialog(chatId) {
    setDialog({
        open: true,
        type: "delete",
        chatId
    });
}

function openLogoutDialog() {
    setDialog({
        open: true,
        type: "logout"
    });
}

function closeDialog() {
    setDialog({
        open: false,
        type: null,
        chatId: null
    });
}

async function handleConfirm() {
    if (dialog.type === "delete") {
        await chat.handleDeleteChat(dialog.chatId);
    }

    if (dialog.type === "logout") {
        await auth.handleLogout();
    }

    closeDialog();
}

  return (
    <div className='dashboard'>
        {dialog.open && (
    <ConfirmDialog
        title={
            dialog.type === "delete"
                ? "Delete chat?"
                : "Logout?"
        }

        message={
            dialog.type === "delete"
                ? "Are you sure you want to delete this chat?"
                : "Are you sure you want to logout?"
        }

        confirmText={
            dialog.type === "delete"
                ? "Delete"
                : "Logout"
        }

        onConfirm={handleConfirm}
        onCancel={closeDialog}
    />
)}
        <div className='sidebar'>
            <div className='sidebar_container'>
                <div className="recent_chats">
                    <p className="new_chat_container" onClick={()=>{openNewChat()}}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 3V5H4V18.3851L5.76282 17H20V10H22V18C22 18.5523 21.5523 19 21 19H6.45455L2 22.5V4C2 3.44772 2.44772 3 3 3H14ZM19 3V0H21V3H24V5H21V8H19V5H16V3H19Z"></path></svg> New Chat</p>
                    <p>Recents</p>
                    <div className="chats">
                        {Object.values(chats)?.map(chat=><div className="chat_container"><button onClick={()=>openChat(chat.id)}>{chat.title}</button> <div className="delete_container" onClick={()=>openDeleteDialog(chat.id)}><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg></div></div>)}
                    </div>
                </div>
                <div className="logged_in_user">
                    <div>
                    <img src="https://commons.wikimedia.org/wiki/File:Default_pfp.jpg" alt="" />
                    <p>{currentUser}</p>
                    </div>
                    <button onClick={(e)=>{openLogoutDialog(e)}}>Logout</button>
                </div>
            </div>
        </div>
        <div className='message'>
            <div className="app_name_bar"><h2>AI Chat Assistant</h2></div>
            <div className='messages_container'>
                {chats[currentChatId]?.messages.map((message)=>{
                return <div className={message.role==="ai"?"ai_message":"user_message"}><ReactMarkdown>{message.content}</ReactMarkdown></div> 
                })}
                  {isLoading && (
                    <div className="ai_message">
                        <div className="message_loader">
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                    </div>
                    )}
                {error && (
                    <div className="error_message">
                    <p>{error}</p>
                </div>
                )}
            </div>
            <div className={`message_section ${currentChatId===null?"new_chat_section":""}`}>
                {currentChatId===null?<h1>Where should we begin ?</h1>:""}
                <div className="input_btn_container">
                    <input type="text" name="input" placeholder="Ask anything" 
                    onChange={(e)=>{setChatInput(e.target.value)}}
                    value={chatInput}
                    ></input>
                    <button onClick={(e)=>{handleSubmit(e)}}>Send Message</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home