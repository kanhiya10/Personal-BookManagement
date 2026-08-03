import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { registerSchema, loginSchema } from "@repo/shared";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";


const generateAccessAndRefereshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })//by setting false mongoose will bypass the validation process before saving

        return { accessToken, refreshToken }
    }
    catch (error) {
        throw new ApiError(500, "Something went wrong while generating access and refresh token")
    }
}

const refreshAccessToken = asyncHandler(async (req, res) => {

    console.log("refreshAccessToken step:1");

    const incomingRefreshToken =
        req.cookies.refreshToken ||
        req.body.refreshToken;

    if (!incomingRefreshToken) {
        throw new ApiError(401, "Unauthorized request");
    }
    console.log("refreshAccessToken step:2", incomingRefreshToken);

    const decodedToken = jwt.verify(
        incomingRefreshToken,
        process.env.REFRESH_TOKEN_SECRET
    );
    console.log("refreshAccessToken step:3", decodedToken);

    const user = await User.findById(decodedToken._id);

    if (!user) {
        throw new ApiError(401, "Invalid refresh token");
    }
    console.log("refreshAccessToken step:4", user);

    if (incomingRefreshToken !== user.refreshToken) {
        throw new ApiError(
            401,
            "Refresh token has been used or is invalid"
        );
    }

    const {
        accessToken,
        refreshToken,
    } = await generateAccessAndRefereshToken(user._id);

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken,
                    refreshToken,
                },
                "Access token refreshed"
            )
        );
});


const registerUser = asyncHandler(async (req, res) => {

    console.log("Request Body:", req.body); // Log the request body for debugging

    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
        throw new ApiError(
            400,
            result.error.issues[0].message
        );
    }

    const { fullName, email, password, username } = result.data;

    const existedUser = await User.findOne({
        $or: [{ email }, { username }]
    })

    if (existedUser) {
        throw new ApiError(409, "User with email or username already exists")
    }


    const user = await User.create({
        fullName,
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    )


})

const loginUser = asyncHandler(async (req, res) => {
    console.log("login step:1");

    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
        throw new ApiError(
            400,
            result.error.issues[0].message
        );
    }

    const { password, username, email } = result.data

    console.log("login step:2");


    if (!username && !email) {
        throw new ApiError(400, "username or password is required");
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(400, "user does't exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);//checks for the password saved in record


    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    }
    console.log("login step:3");

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser
            },
                "User loggedIn successfully")
        )

})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200)
        .json(new ApiResponse(200, req.user, "current user fetched successfully"));
})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $unset: {
            refreshToken: 1,
        },
    });

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out successfully"));
});


export { registerUser, loginUser, refreshAccessToken, getCurrentUser, logoutUser }