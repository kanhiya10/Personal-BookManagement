import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { RemoveFromCloudinary, UploadOnCloudinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { OAuth2Client } from "google-auth-library";


const registerUser=asyncHandler(async(req,res)=>{

    const {fullName,username,email,password}=req.body;


if(
    [fullName,email,username,password].some((field)=>field?.trim()==="")
){
    throw new ApiError(400,"All fields are required")
}

const existedUser=await User.findOne({
    $or :[{email},{username}]
})

if(existedUser){
    throw new ApiError(409,"User with email or username already exists")
}

const avatarLocalPath=req.files?.avatar[0]?.path;//req.files 

let coverImageLocalPath;

if(req.files && Array.isArray(req.files.coverImage)&& req.files.coverImage.length>0){
    coverImageLocalPath=req.files.coverImage[0].path;
}

if(!avatarLocalPath){
    throw new ApiError(400,"Avatar file is required");
}

const avatar = await UploadOnCloudinary(avatarLocalPath, [
  { width: 200, height: 200, crop: 'thumb', gravity: 'face' }
]);

const coverImage = await UploadOnCloudinary(coverImageLocalPath, [
  { width: 1200, height: 400, crop: 'fill', gravity: 'auto' }
]);


if(!avatar){
    if(!avatar){
        throw new ApiError(400,"Avatar file is required");
    }
}

const user=await User.create({
    fullName,
    avatar:avatar.url,
    coverImage:coverImage.url || "",
    email,
    password,
    username:username.toLowerCase()
})

const createdUser=await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(500,"Something went wrong while registering the user");
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User registered Successfully")
)


})

const loginUser=asyncHandler(async(req,res)=>{ 

    const{password,username,email}=req.body

    if(!username && !email){
        throw new ApiError(400,"username or password is required");
    }

    const user=await User.findOne({
        $or:[{username},{email}]
    })

    if(!user){
        throw new ApiError(400,"user does't exist");
    }

      if (user.authProvider === "google") {
    throw new ApiError(403, "Please login using Google Sign-In");
  }

    const isPasswordValid=await user.isPasswordCorrect(password);//checks for the password saved in record


    if(!isPasswordValid){
        throw new ApiError(401,"Invalid user credentials");
    }

    const{accessToken,refreshToken}=await generateAccessAndRefereshToken(user._id)

    const loggedInUser=await User.findById(user._id).select("-password -refreshToken")//select is used to exclude values

    const options={
        httpOnly: true,      
        secure: true,      
        sameSite: 'none',     
    }

    return res
    .status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(
        new ApiResponse(200,{
            user:loggedInUser,accessToken,refreshToken
        },
    "User loggedIn successfully")
    )

})
