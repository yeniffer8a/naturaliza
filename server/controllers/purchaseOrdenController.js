import { getPurchaseOrders } from "../services/purchaseOrderService.js";
import { purchaseOrderValidator } from "../models/purchaseOrder.js";
import { z } from "zod";

export async function listPurchaseOrders(req,res) {
    try {
        const purchaseOrder = await getPurchaseOrders();
        return res.status(200).json({ok:true,purchaseOrder})
    } catch (error) {
        res.status(500).json({ok: false, message: error.message})
    }
}
