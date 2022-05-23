import asyncHandler from "express-async-handler";
import userModel from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

const registerUser = asyncHandler(async (req, res) => {
  const user = await userModel.registerUser(req.body);
  if (user) {
    user.password = undefined;
    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } else {
    res.status(400).send("Please provide valid data");
    throw new Error("Invalid user data");
  }
});
const authUser = asyncHandler(async (req, res) => {
  const user = await userModel.authUser(req.body);
  user.password = undefined;
  const token = generateToken(user._id);
  res.status(200).json({ user, token });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await userModel.findUserById(req.user);
  user.password = undefined;
  res.status(200).json(user);
});

export { authUser, getUserProfile, registerUser };
