import {
  getProducts,
  createProduct,
  destroyProductByCode,
  getProductByCode,
  updateProduct,
  getProductsByName,
} from "../services/productsService.js";
import { procdutValidation } from "../models/Product.js";
import { z } from "zod";

export async function listProducts(req, res) {
  try {
    const products = await getProducts();
    return res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export async function oneProduct(req, res) {
  try {
    const code = req.params.code;
    const product = await getProductByCode(code);
    if (typeof product === "string") {
      return res.status(404).json({ message: product });
    }
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}

export async function productsByName(req, res) {
  try {
    const name = req.params.name;
    const product = await getProductsByName(name);
    if (typeof product === "string") {
      return res.status(404).json({ ok: false, message: product });
    }
    return res.status(200).json({ ok: true, product });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, message: error.message });
  }
}

export async function createNewProduct(req, res) {
  try {
    const valProduct = await getProductByCode(req.body.code);
    if (typeof valProduct === "object") {
      return res
        .status(400)
        .json({ ok: false, message: "Product already exists" });
    }

    let characteristics = JSON.parse(req.body.characteristics);
    let presentations = JSON.parse(req.body.presentations);
    let preparationInstructions = JSON.parse(req.body.preparationInstructions);

    const reqData = req.body;

    reqData.characteristics = characteristics;
    reqData.presentations = presentations;
    reqData.preparationInstructions = preparationInstructions;

    const product = procdutValidation.parse(reqData);
    const imagen = req.file.supabaseUrl;

    const newProduct = await createProduct(product, imagen);

    if (typeof newProduct === "string") {
      return res.status(400).json({ ok: false, message: newProduct });
    }
    return res.status(201).json({ ok: true, newProduct });
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return res.status(400).json({
        ok: false,
        message: error.errors.map((err) => err.message).join(","),
      });
    }
    console.log(error);
    return res.status(500).json({ ok: false, message: error.message });
  }
}

export async function updateProductData(req, res) {
  try {
    const code = req.body.code;
    const product = await getProductByCode(code);
    if (typeof product === "string") {
      return res.status(404).json({ ok: false, message: product });
    }
    let characteristics = JSON.parse(req.body.characteristics);
    let presentations = JSON.parse(req.body.presentations);
    let preparationInstructions = JSON.parse(req.body.preparationInstructions);

    const reqData = req.body;
    reqData.characteristics = characteristics;
    reqData.presentations = presentations;
    reqData.preparationInstructions = preparationInstructions;

    const productData = procdutValidation.parse(reqData);

    let image;

    if (req.body.image === undefined) {
      image = req.file.supabaseUrl;
    } else {
      image = req.body.image;
    }

    const updatedProduct = await updateProduct(product, productData, image);
    if (typeof updatedProduct === "string") {
      return res.status(400).json({ ok: false, message: updatedProduct });
    }
    return res.status(200).json({ ok: true, updatedProduct });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const code = req.params.code;
    const product = await getProductByCode(code);
    if (typeof product === "string") {
      return res.status(404).json({ ok: false, message: product });
    }
    const destroyProduct = await destroyProductByCode(code);
    return res.status(200).json({ ok: true, message: "Product deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ ok: false, message: error.message });
  }
}
