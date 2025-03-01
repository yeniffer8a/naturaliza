import {
  getPurchaseOrders,
  createPurchaseOrder,
  numberOrder,
  destroyPurchaseOrder,
  getPurchaseOrderByNumber,
  updateStatusOrder,
} from "../services/purchaseOrderService.js";
import { getUserBy } from "../services/userService.js";
// import { purchaseOrderValidator } from "../models/purchaseOrder.js";
import { z } from "zod";
import { purchaseOrderValidator } from "../models/purchaseOrder.js";

export async function listPurchaseOrders(req, res) {
  try {
    const purchaseOrder = await getPurchaseOrders();
    return res.status(200).json({ ok: true, purchaseOrder });
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}

export async function createNewPurchaseOrder(req, res) {
  try {
    const data = req.body;
    data.orderNumber = await numberOrder();
    const id = req?.userId;

    if (id !== undefined) {
      const user = await getUserBy(req.userId);
      console.log(user);
      const newUser = {
        idUser: req.userId,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        city: user.city,
        country: user.country,
        postCode: user.postCode,
      };

      data.user = newUser;

      if (req.body.sameAddress === true) {
        const billingAddress = {
          address: user.address,
          city: user.city,
          country: user.country,
          postCode: user.postCode,
        };
        data.billingAddress = billingAddress;
      }
    }
    if ((req.body.sameAddress === true) & (id === undefined)) {
      const billingAddress = {
        address: data.user.address,
        city: data.user.city,
        country: data.user.country,
        postCode: data.user.postCode,
      };
      data.billingAddress = billingAddress;
    }

    const valdData = purchaseOrderValidator.parse(data);

    const newPurchaseOrder = await createPurchaseOrder(valdData);

    return res.status(201).json({ ok: true, newPurchaseOrder });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(`Problem: ${error}`);
      return res.status(400).json({
        ok: false,
        message: error.errors.map((err) => err.message).join(","),
      });
    }
    console.log(error);
    return res.status(500).json({ ok: false, message: error.message });
  }
}

export async function updateStatus(req, res) {
  try {
    const numberOrder = req.body.orderNumber;
    const status = req.body.status;

    const purchaseOrder = await getPurchaseOrderByNumber(numberOrder);

    if (typeof purchaseOrder === "string") {
      return res.status(404).json({ ok: false, message: purchaseOrder });
    }

    const purchaseOrderUpdate = await updateStatusOrder(purchaseOrder, status);

    if (typeof purchaseOrderUpdate === "string") {
      return res.status(400).json({ ok: false, message: purchaseOrderUpdate });
    }

    return res.status(200).json({ ok: true, purchaseOrderUpdate });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}

export async function deleteOrderByNumber(req, res) {
  try {
    const numberOrder = req.params.ordernumber;

    const purchaseOrder = await getPurchaseOrderByNumber(numberOrder);

    if (typeof purchaseOrder === "string") {
      return res.status(404).json({ ok: false, message: purchaseOrder });
    }
    const destroyOrder = await destroyPurchaseOrder(purchaseOrder);
    return res
      .status(200)
      .json({ ok: true, message: "Purchase Order deleted" });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}
