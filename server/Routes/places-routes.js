import { Router } from "express";
import { body } from "express-validator";
import {
  getPlacesByPlaceId,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} from "../Controllers/places-controllers.js";

const router = Router();

router.get("/:pid", getPlacesByPlaceId);

router.get("/user/:uid", getPlacesByUserId);

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
  "/:pid",
  [
    body("title").trim().not().isEmpty(),
    body("description").isLength({ min: 5 }),
  ],
  updatePlace
);

router.delete("/:pid", deletePlace);

export default router;
