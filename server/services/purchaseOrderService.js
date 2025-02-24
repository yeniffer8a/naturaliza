import PurchaseOrder from "../models/purchaseOrder.js";

export async function getPurchaseOrders() {
    try{
        const purchaseOrders = await PurchaseOrder.find({deleteAt: {$eq:null}});
        return purchaseOrders

    }catch{
        throw new Error(`Error getProducts: ${error.message}`);
    }
}

