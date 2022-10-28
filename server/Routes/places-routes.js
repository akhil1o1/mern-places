import express from "express";
import {
  getPlacesByPlaceId,
  getPlacesByUserId,
  createPlace,
  updatePlace,
  deletePlace
} from "../Controllers/places-controllers.js";

const router = express.Router();

router.get("/:pid", getPlacesByPlaceId);
router.get("/user/:uid", getPlacesByUserId);
router.post("/", createPlace);
router.patch("/:pid", updatePlace);
router.delete("/:pid", deletePlace);


export default router;
