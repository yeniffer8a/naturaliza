import express from "express";
import productRouter from "./productRouter.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";


const router = express.Router();

router.use("/api", authRoutes);
router.use("/api", userRoutes);

router.use("/products", productRouter);


export default router;
