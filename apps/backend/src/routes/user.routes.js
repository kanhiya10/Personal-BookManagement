import express from "express";
import {registerUser, loginUser,refreshAccessToken,getCurrentUser,logoutUser} from "../controller/user.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);
router.get("/me", verifyJWT, getCurrentUser);
router.post("/logout", verifyJWT, logoutUser);

export default router;
