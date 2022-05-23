import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";

const matchPasswords = asyncHandler(async (req, res, next) => {
  const user = await userModel.authUser(req.body);
  const isMatch = await bcrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    res.status(401).send("Wrong Credentials");
    throw new Error("Wrong Credentials");
  }
  next();
});

export { matchPasswords };
