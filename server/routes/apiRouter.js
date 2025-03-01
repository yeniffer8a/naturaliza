import express from "express";
import productRouter from "./productRouter.js";
import userRoutes from "./userRoutes.js";
import authRoutes from "./authRoutes.js";
import purchaseOrderRouter from "./purchaseOrderRouter.js";
import paypalRoutes from "./paypalRoutes.js";

const router = express.Router();

router.use("/api", authRoutes);
router.use("/api", userRoutes);

router.use("/products", productRouter);

router.use("/purchaseOrder", purchaseOrderRouter);
router.use("/paypal", paypalRoutes);

export default router;
