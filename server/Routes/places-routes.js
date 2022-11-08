import { Router } from "express";
import { body } from "express-validator";
import {
  getPlaceByPlaceId,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} from "../Controllers/places-controllers.js";

const router = Router();

router.get("/:placeId", getPlaceByPlaceId);

router.get("/user/:userId", getPlacesByUserId);

router.post(
  "/",
  [
    body("title").trim().not().isEmpty(), // middlewares to validate requests
    body("description").isLength({ min: 5 }),
    body("address").trim().not().isEmpty(),
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
