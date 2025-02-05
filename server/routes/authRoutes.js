import express from "express";
import { login } from "../controllers/userController.js";

const router = express.Router();

router.post("/token", login);

export default router;
