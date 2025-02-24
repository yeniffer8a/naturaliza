import express from "express";
import dotenv from "dotenv";
import {
  createUser,
  updateUser,
  deleteUserById,
  getUserByEmail,
} from "../controllers/userController.js";
import { expressjwt } from "express-jwt";
import { tokenValidator } from "../middleware/tokenValidator.js";

dotenv.config();
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "contraseniaSecreta!";

router.get("/users/:email", getUserByEmail);

router.post("/users", createUser);

router.patch(
  "/usersupdate/",
  tokenValidator,
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  updateUser
);

router.delete(
  "/usersdelete/",
  tokenValidator,
  expressjwt({ secret: jwtSecret, algorithms: ["HS256"] }),
  deleteUserById
);

export default router;
