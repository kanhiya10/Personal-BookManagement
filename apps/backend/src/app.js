import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app=express();

app.use(cookieParser());

app.use(cors({
    origin: ['https://bookmanagement-giohqmhhz-kanhiya-s-projects.vercel.app','http://localhost:3000'],
    credentials:true,
}))

app.use(express.json({limit:"16kb"}))

app.use(express.urlencoded())

app.use(express.static('public'))


import userRouter from "./routes/user.routes.js";
import bookRouter from "./routes/book.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/books", bookRouter);


export {app};