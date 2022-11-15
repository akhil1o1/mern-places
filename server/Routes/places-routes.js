import { Router } from "express";
import { body } from "express-validator";
import {
  getPlaceByPlaceId,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} from "../Controllers/places-controllers.js";
import fileUpload from "../Middleware/file-upload.js";
import checkAuth from "../Middleware/check-auth.js";

const router = Router();

router.get("/:placeId", getPlaceByPlaceId);

router.get("/user/:userId", getPlacesByUserId);

router.use(checkAuth); // middleware to check authentication and protect subsequent routes.

router.post(
  "/",
  fileUpload.single("image"), // middleware from multer to extract image file and save it to server.
  [
    body("title").trim().not().isEmpty(), // middlewares to validate requests
    body("description").isLength({ min: 5 }),
    body("address").trim().not().isEmpty(),
    body("creator").trim().not().isEmpty()
  ],
  createPlace
);

router.patch(
  "/:placeId",
  [
    body("title").trim().not().isEmpty(),
    body("description").isLength({ min: 5 }),
  ],
  updatePlace
);

router.delete("/:placeId", deletePlace);

export default router;
