import {
  getProducts,
  createProduct,
  destroyProduct,
  getProductByCode,
  updateProduct,
} from "../services/productsService.js";
import { procdutValidation } from "../models/Product.js";
import { supabase } from "../config/supaBase.js";
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

export async function createNewProduct(req, res) {
  try {
    let characteristics = JSON.parse(req.body.characteristics);
    let presentations = JSON.parse(req.body.presentations);
    let preparationInstructions = JSON.parse(req.body.preparationInstructions);

    const reqData = req.body;
    
    reqData.characteristics = characteristics;
    reqData.presentations = presentations;
    reqData.preparationInstructions = preparationInstructions;

    const product = procdutValidation.parse(reqData);
    const file = req.file;
    console.log(req.file);

    const { data, errors } = await supabase.storage
      .from('imagens')
      .upload(file.originalname, file);
    console.log(data);

    if (errors) {
      return res.status(400).json({ message: errors });
    }

    const { data: image } = supabase.storage
      .from('imagens')
      .getPublicUrl(data.path);

    console.log(image);

    const newProduct = await createProduct(product, image);

    if (typeof newProduct === "string") {
      return res.status(400).json({ message: newProduct });
    }
    return res.status(201).json(newProduct);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.log(error);
      return res
        .status(400)
        .json({ message: error.errors.map((err) => err.message).join(",") });
    }
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
}
