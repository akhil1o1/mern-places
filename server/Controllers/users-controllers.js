import { validationResult } from "express-validator";

import HttpError from "../Models/http-error.js";
import User from "../Models/user-model.js";


export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, "-password"); //to exclude password field or ("name  email") => include only name and email
    res.json(users);
  } catch (error) {
    next (new HttpError("Fetching users failed. Please try again later", 500));
  }
};

export const signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // to check validation errors from express validators
    return next(
      new HttpError("Invalid user input. please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  let userAlreadyExists;
  try {
    userAlreadyExists = await User.findOne({ email: email });
  } catch (error) {
    return next(
      new HttpError("Signing up failed. please try again later.", 500)
    );
  }

  if (userAlreadyExists) {
    return next(new HttpError("User already exists. Please login instead."));
  }

  const newUser = new User({
    name,
    email,
    password,
    image:
      "https://media-exp1.licdn.com/dms/image/C5603AQFrTOsBbpVAYw/profile-displayphoto-shrink_800_800/0/1641206424684?e=1672876800&v=beta&t=gDpDaTjD4j3KGfC3WdnT_6Za75l0WdoEhHkPTJ_cz0g",
    places: [], //place will get populated with placeIDs of places created by user.
  });

  let createdUser;
  try {
    createdUser = await newUser.save();
  } catch (error) {
    return next(
      new HttpError("Signing up failed. Please try again later.", 500)
    );
  }

  res.status(201).json({ createdUser });
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  let matchedUser;
  try {
    matchedUser = await User.findOne({ email: email });
  } catch (error) {
    return next(new HttpError("Login failed. please try again later.", 500));
  }

  if (!matchedUser) {
    return next(
      new HttpError("Email does not exist. Please sign up instead.", 401)
    );
  }

  if (matchedUser.password !== password) {
    return next(new HttpError("Wrong password.", 401));
  }

  res.json({ message: "Logged in" });
};
