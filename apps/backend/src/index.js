import "./config/env.js";
import express from "express";
import cors from "cors";
import {app} from "./app.js";
import connectDB from "../src/db/db.js";



connectDB()
  .then(async () => {
    app.listen(process.env.PORT || 4000, () => {

    });
  })
  .catch((err) => {
    console.error("Failed to connect to the database", err);
  });


  