import React from 'react'
import "../styles/auth.scss"
import { Link } from 'react-router';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth.js';

const Login = () => {
    let{handleLogin}=useAuth();
    let[username, setUsername]=useState("");
    let[password, setPassword]=useState("");
    let error = useSelector((state)=>state.auth.error);
    let navigate=useNavigate()

    async function login(){
        let sucess=await handleLogin(username,password)
        
        if(sucess){
            navigate("/")
        }

    }

  return (
    <div className='main'>
        <h1>Login</h1>
        <div className='container'>
            <input placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}></input>
            <input placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}></input>
            {
                error &&  <div className="auth_error">
                    <p>{error}</p>
                </div>
            }
        <button onClick={login}>Login</button>
        </div>
        <p>Not registered ? Click here to <Link to={"/register"}>Register</Link></p>
        </div>
  )
}

export default Login