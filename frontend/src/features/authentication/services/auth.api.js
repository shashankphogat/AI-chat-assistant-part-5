import axios from "axios";

let api=axios.create({
    baseURL:"/api/auth",
    withCredentials:true
})

async function login(username,password){
    let response = await api.post("/login",{username,password});
    return response.data;
}

async function register(username,email,password){
    let response= await api.post("/register",{username,email,password});
    return response.data;
}

async function getMe(){
    let response = await api.get("/getMe");
    return response.data;
}

async function logout(){
    let response= await api.post("/logout");
    return response.data;
}

export {login,register,getMe,logout}