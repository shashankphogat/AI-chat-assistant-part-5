import express from "express";
import userRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import chatRoutes from "./routes/chat.route.js"
import cors from "cors";

let app=express();

app.use(express.static("./public"))

app.use(express.json());

app.use(cookieParser());

app.use(cors(
    {
        origin:"/",
        credentials:true
    }
))

app.use("/api/auth",userRoutes)

app.use("/api/chat",chatRoutes)

export default app;