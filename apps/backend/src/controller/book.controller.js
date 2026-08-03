import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { Book } from "../models/book.model.js";
import { bookSchema } from "@repo/shared";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import mongoose from "mongoose";


const addBook = async (req, res) => {
    try {
        console.log("addBook step:1");
        const result = bookSchema.safeParse(req.body);
        console.log("addBook step:1.1", result);

        if (!result.success) {
            return res.status(400).json({
                success: false,
                errors: result.error.flatten().fieldErrors,
            });
        }

        const { title, author, status, tags } = result.data;

        let coverImage = "";
        console.log("req.file:", req.file);

        if (req.file) {
            const coverImg = await UploadOnCloudinary(req.file.path, [
                {
                    width: 400,
                    height: 600,
                    crop: "fill",
                    gravity: "auto",
                },
            ]);
            if (!coverImg) {
                throw new ApiError(500, "Failed to upload cover image to Cloudinary");
            }

            console.log("Cloudinary upload response:", coverImg);
            coverImage = coverImg.url;
        }
        console.log("addBook step:2", { title, author, status, tags, coverImage });

        const book = await Book.create({
            title,
            author,
            status,
            tags: tags
                .split(",")
                .map(tag => tag.trim())
                .filter(Boolean),
            coverImage,
            owner: req.user._id,
        });


        return res.status(201).json({
            success: true,
            book,
        });
    } catch (error) {
        console.error("Error in addBook:", error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const fetchAllBooks = async (req, res) => {
    try {
        const ownerId = new mongoose.Types.ObjectId(req.user._id);

        const result = await Book.aggregate([
            {
                $match: {
                    owner: ownerId,
                },
            },
            {
                $facet: {
                    books: [
                        {
                            $sort: {
                                createdAt: -1,
                            },
                        },
                        {
                            $project: {
                                title: 1,
                                author: 1,
                                coverImage: 1,
                                status: 1,
                            },
                        },
                    ],
                    stats: [
                        {
                            $group: {
                                _id: null,
                                totalBooks: { $sum: 1 },
                                completed: {
                                    $sum: {
                                        $cond: [{ $eq: ["$status", "Completed"] }, 1, 0],
                                    },
                                },
                                reading: {
                                    $sum: {
                                        $cond: [{ $eq: ["$status", "Reading"] }, 1, 0],
                                    },
                                },
                                wantToRead: {
                                    $sum: {
                                        $cond: [{ $eq: ["$status", "Read"] }, 1, 0],
                                    },
                                },
                            },
                        },
                    ]
                },
            },
        ]);

        const books = result[0].books;

        const stats = result[0].stats[0] || {
            totalBooks: 0,
            completed: 0,
            reading: 0,
            wantToRead: 0,
        };

        return res.status(200).json({
            success: true,
            data: {
                ...stats,
                books,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getBooks = async (req, res) => {
  try {
    const { status = "", tag = "" } = req.query;

    const query = {
      owner: req.user._id,
    };

    // Filter by status
    if (status) {
      query.status = status;
    }

    // Filter by tag (case-insensitive)
    if (tag) {
      query.tags = {
        $regex: tag,
        $options: "i",
      };
    }

    const books = await Book.find(query).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    console.error("Error fetching books:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting book:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBookStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const book = await Book.findOneAndUpdate(
      {
        _id: req.params.id,
        owner: req.user._id,
      },
      {
        status,
      },
      {
        new: true,
      }
    );

    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    return res.json({
      success: true,
      book,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export { addBook, fetchAllBooks, getBooks, updateBookStatus, deleteBook };