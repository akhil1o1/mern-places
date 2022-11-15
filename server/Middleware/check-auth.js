import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import HttpError from "../Models/http-error.js";

const checkAuth = (req, res, next) => {
  if (req.method === "OPTIONS") { // if browser sends an options request.
    return next();
  }
  // req.headers.authorization value will be : "Bearer Token" , to extract "Token" from this string, split is being used which will give an array of the two strings ["Bearer", "Token"]
  try {
    const token = req.headers.authorization.split(" ")[1]; // extracting token from req headers

    if (!token) {
      // in case token isn't present in authorization header
      throw new Error(); // error will be handled in catch block.
    }

    const decodedToken = jwt.verify(token, process.env.JWT_TOKEN_KEY); // returns the data(string/object) encoded in token in signup/login controllers.
    req.userId = decodedToken.userId; // adding decodedUserId to request to be used in subsequent routes/controllers
    next(); // forwarding req to subsequent routes
  } catch (error) {
    // in case authorization header is not set in the request and thus split fails.
    return next(new HttpError("Authentication failed!!!", 401));
  }
};

export default checkAuth;
