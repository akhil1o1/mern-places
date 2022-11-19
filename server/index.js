import * as dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import HttpError from "./Models/http-error.js";
import placesRoutes from "./Routes/places-routes.js";
import userRoutes from "./Routes/users-routes.js";

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({extended: true})); // needed to handle form data other wise not required

// middleware to handle request and serve static files/images.
app.use("/uploads/images", express.static(path.join("uploads", "images")));

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => {
  //in case the route does not match any of the above
  throw new HttpError("Could not find the route.", 404);
});

//middleware for error handling for all requests.
app.use((error, req, res, next) => {
  // multer adds a file property to req body which contains the file if any
  if (req.file) {
    // to rollback file upload if there is any error.
    fs.unlink(req.file.path, (error) => console.log(error)); // to delete image from server using fs
  }
  if (res.headerSent) {
    next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});

mongoose
  .connect(process.env.MONGODB_URI_LOCAL)
  .then(() => {
    app.listen(process.env.PORT);
    console.log(
      `DB connected and server is listening at port ${process.env.PORT}`
    );
  })
  .catch((error) => console.log(error));
