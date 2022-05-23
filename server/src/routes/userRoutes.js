import express from "express";
import {
  authUser,
  getUserProfile,
  registerUser,
} from "../controllers/userController.js";
import { isAuth } from "../middlewares/auth.js";
import { matchPasswords } from "../middlewares/checkPasswords.js";
import {
  profileExists,
  userExists,
  userNotExist,
} from "../middlewares/checkUser.js";

const router = express.Router();

router.route("/").post(userNotExist, registerUser);
router.post("/login", userExists, matchPasswords, authUser);
router.route("/profile").get(isAuth, profileExists, getUserProfile);
export default router;
