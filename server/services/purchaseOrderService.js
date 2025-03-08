import PurchaseOrder from "../models/purchaseOrder.js";

export async function getPurchaseOrders() {
  try {
    const purchaseOrders = await PurchaseOrder.find({
      deleteAt: { $eq: null },
    });
    return purchaseOrders;
  } catch {
    throw new Error(`Error getPurchaseOrders: ${error.message}`);
  }
}

export async function getPurchaseOrderByNumber(orderNumber) {
  try {
    const purchaseOrder = await PurchaseOrder.findOne({
      orderNumber: orderNumber,
    });
    return purchaseOrder;
  } catch (error) {
    throw new Error(`Error getPurchaseOrderByNumber: ${error.message}`);
  }
}

export async function createPurchaseOrder(purchaseData) {
  try {
    const {
      user,
      orderNumber,
      products,
      billingAddress,
      cost,
      status,
      paymentInfo,
      deliveryTime,
      sameAddress,
    } = purchaseData;

    const newPurchaseOrder = await PurchaseOrder.create({
      orderNumber: orderNumber,
      user: user,
      products: products,
      sameAddress: sameAddress,
      billingAddress: billingAddress,
      cost: cost,
      status: status,
      paymentInfo: paymentInfo,
      deliveryTime: deliveryTime,
    });
    return newPurchaseOrder;
  } catch (error) {
    throw new Error(`Error create Purchase Order: ${error.message}`);
  }
}

export async function numberOrder() {
  try {
    const numberOrder = await PurchaseOrder.find()
      .sort({ orderNumber: -1 })
      .limit(1);
    if (numberOrder == false) {
      return 100000000000;
    }
    let datosOrder = numberOrder.values();
    let number01 = 0;

    for (let order of datosOrder) {
      number01 = order.orderNumber;
    }
    return number01 + 1;
  } catch {
    throw new Error(`Error numberOrder: ${error.message}`);
  }
}

export async function updateStatusOrder(order, status) {
  try {
    order.status = status;
    await order.save();
    return {message:`Purchase Order with number order: ${order.orderNumber} status updated`}
  } catch (error) {
    throw new Error(`Error updateStatusOrder: ${order.orderNumber}`);
  }
}

export async function destroyPurchaseOrder(order) {
  try {
    order.deletedAt = Date.now();
    await order.save();
    return { message: `Product with code: ${order.orderNumber} deleted` };
  } catch (error) {
    throw new Error(`Error destroyProduct: ${error.message}`);
  }
}
