import React from 'react'
import { Link, useNavigate } from 'react-router'
import { useState } from 'react';
import useAuth from '../hooks/useAuth.js';
import "../styles/auth.scss"
import { useSelector } from 'react-redux';

const Registration = () => {
    let[username, setUsername]=useState("");
    let[email, setEmail]=useState("");
    let[password, setPassword]=useState("");
    let{handleRegister}=useAuth();
    let navigate=useNavigate();
    let error = useSelector((state)=>state.auth.error);

    async function handleSubmit(e){
        e.preventDefault();
        let success=await handleRegister(username,email,password);
        if(success){
            navigate("/");
        }
    }

  return (
    <div className='main'>
    <h1>Registration</h1>
         <div className='container'>
            <input placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
            <input placeholder="Email" value={email} onChange={(e)=>{setEmail(e.target.value)}}></input>
            <input placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
             {
                error &&  <div className="auth_error">
                    <p>{error}</p>
                </div>
            }
        <button onClick={(e)=>{handleSubmit(e)}}>Register</button>
        </div>
        <p>Already registered ? Click here to <Link to={"/login"}>Login</Link></p>
        </div>
  )
}

export default Registration