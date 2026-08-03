import express from "express";
import {addBook,fetchAllBooks,getBooks,updateBookStatus,deleteBook} from "../controller/book.controller.js";
import {verifyJWT} from "../middleware/auth.middleware.js";
import {upload} from "../middleware/multer.middleware.js";

const router = express.Router();

router.post("/add", verifyJWT,upload.single("coverImage"), addBook);

router.get("/fetchAll", verifyJWT, fetchAllBooks);

router.get("/",verifyJWT,getBooks);

router.route("/delete/:id").delete(verifyJWT,deleteBook);

router.patch("/:id/status", verifyJWT, updateBookStatus);



export default router;
