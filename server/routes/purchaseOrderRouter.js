import express from "express";
import { listPurchaseOrders } from "../controllers/purchaseOrdenController.js";


const router = express.Router()

router.get("/listPurchase",listPurchaseOrders);


export default router;