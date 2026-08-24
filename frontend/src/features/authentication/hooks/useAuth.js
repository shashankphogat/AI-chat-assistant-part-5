import React from 'react'
import {setUser,setLoading,setError} from "../auth.slice.js";
import {login,register,getMe,logout} from "../services/auth.api.js"
import { useDispatch } from 'react-redux';

const useAuth = () => {
    let dispatch=useDispatch();
    async function handleLogin(username,password){
        try{
            dispatch(setLoading(true))
            let data=await login(username,password)
            dispatch(setUser(data))
            dispatch(setError(null))
            return true
        }
        catch(err){
            dispatch(setError(err?.response?.data?.message || "login failed")) 
            return false  
        }
        finally{
            dispatch(setLoading(false))
        }
    }
    async function handleRegister(username,email,password){
        try{
            dispatch(setLoading(true))
            let data=await register(username,email,password);
            dispatch(setUser(data))
            dispatch(setError(null))
            return true
        }
        catch(err){
            dispatch(setError(err?.response?.data?.message || "registration failed"))
            return false
        }
        finally{
            dispatch(setLoading(false))
        }
    }
    async function handleGetMe(){
          try{
        dispatch(setLoading(true))
        let data=await getMe();
          dispatch(setUser(data))
          dispatch(setError(null))
        }
        catch(err){
            console.log(err?.response?.data?.message)
        }
        finally{
            dispatch(setLoading(false))
        }
    }
    async function handleLogout(){
        try{
            dispatch(setLoading(true))
            await logout();
            dispatch(setUser(null));
            dispatch(setError(null))
            return true
        }
        catch(err){
            dispatch(setError(err?.response?.data?.message || "logout failed"))
            return false
        }
        finally{
            dispatch(setLoading(false))
        }
    }
  return (
    {handleLogin,handleRegister,handleGetMe,handleLogout}
  )
}

export default useAuth