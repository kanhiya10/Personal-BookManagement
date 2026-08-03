import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      index: true,
    },

    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["Read", "Reading", "Completed"],
      default: "Read",
    },

    coverImage: {
      type: String,
      default: "",
    },

    tags: [
      {
        type: String,
        trim: true,
      },
    ],

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Book = mongoose.model("Book", bookSchema);