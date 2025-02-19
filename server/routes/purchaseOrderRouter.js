import express from "express";
import { listPurchaseOrders,createNewPurchaseOrder,deleteOrderByNumber,updateStatus } from "../controllers/purchaseOrdenController.js";
import { purchaseToken } from "../middleware/purchaseToken.js";
import {tokenValidator} from "../middleware/tokenValidator.js";
import {rolUserValidator} from "../middleware/rolUserValidator.js"
import { expressjwt } from "express-jwt";



const router = express.Router()

router.get("/listPurchase",listPurchaseOrders);

router.post("/createorder",purchaseToken,createNewPurchaseOrder)

router.patch("/updatestatus",updateStatus)

router.delete("/deleteorder/:ordernumber",tokenValidator,expressjwt({secret:process.env.JWT_SECRET, algorithms: ['HS256']}),rolUserValidator,deleteOrderByNumber)

export default router;