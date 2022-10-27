import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import placesRoutes from "./Routes/places-routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/places", placesRoutes);


app.listen(process.env.PORT, () => {
  console.log(`server is listening at port ${process.env.PORT}`);
});
