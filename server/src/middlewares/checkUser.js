import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const userExists = asyncHandler(async (req, res, next) => {
  const user = await userModel.authUser(req.body);
  if (!user) {
    res.status(401).send("User doesn't exist");
    throw new Error("User doesn't exist");
  }
  next();
});

const userNotExist = asyncHandler(async (req, res, next) => {
  const user = await userModel.authUser(req.body);
  if (user) {
    res.status(400).send("User already exists");
    throw new Error("User already exists");
  }
  next();
});

const profileExists = asyncHandler(async (req, res, next) => {
  const user = await userModel.findUserById(req.user);
  if (!user) {
    res.status(404);
    throw new Error("Profile doesn't exists");
  }
  next();
});

export { userExists, profileExists, userNotExist };
