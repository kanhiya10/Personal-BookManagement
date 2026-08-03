import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials:true,
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded())

app.use(express.static('public'))


import userRouter from "./routes/user.routes.js";

app.use("/api/v1/users", userRouter);


export {app};