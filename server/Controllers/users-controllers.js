import HttpError from "../Models/http-error.js";
import { validationResult } from "express-validator";
import { nanoid } from "nanoid";

const USERS = [
  {
    id: "u1",
    name: "akhil panwar",
    email: "akhil@test.com",
    password: "akhil123",
  },
  {
    id: "u2",
    name: "anil rana",
    email: "anil@test.com",
    password: "anil123",
  },
];

export const getUsers = (req, res, next) => {
  res.json({ USERS });
};

export const signup = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    throw new HttpError("Invalid user input. please check your data.", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = USERS.find((user) => user.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user. Email already exists.", 422);
  }

  const id = nanoid();
  const createdUser = { id, name, email, password };

  USERS.push(createdUser);

  res.status(201).json({ createdUser });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  
  const matchedUser = USERS.find((user) => {
    return user.email === email && user.password === password;
  });

  if (!matchedUser) {
    throw new HttpError("Could not identify the user.", 401);
  } else {
    res.json({ message: "Logged in" });
  }
};
