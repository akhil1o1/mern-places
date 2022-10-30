import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import HttpError from "./Models/http-error.js";
import placesRoutes from "./Routes/places-routes.js";
import userRoutes from "./Routes/users-routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/places", placesRoutes);
app.use("/api/users", userRoutes);

app.use((req, res, next) => { //in case the route does not match any of the above
  throw new HttpError("Could not find the route.", 404);
});

app.use((error, req, res, next) => {
  //middleware for error handling for all requests.
  if (res.headerSent) {
    next(error);
  }
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred!" });
});


app.listen(process.env.PORT, () => {
  console.log(`server is listening at port ${process.env.PORT}`);
});
