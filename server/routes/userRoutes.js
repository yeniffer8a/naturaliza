import express from "express";
import dotenv from "dotenv";
import { createUser } from "../controllers/userController.js";
import { expressjwt } from "express-jwt";

dotenv.config();
const router = express.Router();
const jwtSecret = process.env.JWT_SECRET || "contraseniaSecreta!";

router.post("/users", createUser);
export default router;
