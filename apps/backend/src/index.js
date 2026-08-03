import "./config/env.js";
import express from "express";
import cors from "cors";
import {app} from "./app.js";
import connectDB from "../src/db/db.js";



connectDB()
  .then(async () => {
    // Start server
    console.log("Connected to the database successfully");
    app.listen(process.env.PORT || 4000, () => {
      console.log(`Server is running on port ${process.env.PORT || 4000}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });


  