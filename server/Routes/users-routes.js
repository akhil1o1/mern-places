import { Router } from "express";
import { body } from "express-validator";

import { getUsers, signup, login } from "../Controllers/users-controllers.js";
import fileUpload from "../Middleware/file-upload.js";

const router = Router();

router.get("/", getUsers);

router.post(
  "/signup",
  fileUpload.single("image"), // middleware from multer to extract image file and save it.
  [
    body("name").trim().not().isEmpty(),
    body("email").trim().normalizeEmail().isEmail(), // normalize email => Test@test.com => test@test.com
    body("password").trim().isLength({ min: 6 }),
  ],
  signup
);

router.post("/login", login);

export default router;
