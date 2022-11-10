import multer from "multer";
import { nanoid } from "nanoid";

// to map file type based on mimeType.
const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

// configuring multer
const fileUpload = multer({
  limits: 500000, // in bytes
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads/images"); // file storage destination
    },
    filename: (req, file, cb) => {
      const imageExtension = MIME_TYPE_MAP[file.mimetype]; //will dynamically extract img extn
      cb(null, nanoid() + "." + imageExtension); // the name of the file within the destination
    },
  }),
  fileFilter: (req, file, cb) => {//to provide validation for the type of files that can be uploaded
    const isValid = !!MIME_TYPE_MAP[file.mimetype]; // !! converts undefined or null to false and a value to true
    let error = isValid ? null : new Error("Invalid mime type!!")
    cb(error, isValid); // second argument must be a boolean value to whether to accept or reject the file.
  }
});
// fileUpload will be an object that containes middlewares which can be used in place and user routes

export default fileUpload;
