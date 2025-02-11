import Product from "../models/Product.js";

export async function getProducts() {
  try {
    const products = await Product.find();
    return products;
  } catch (error) {
    throw new Error(`Error getProducts: ${error.message}`);
  }
}

export async function getProductByCode(code) {
    try {
        const product = await Product.findOne({ code: code });
        if (!product) {
          return { message: `Product not found with code: ${code}`};
        }
        return product;
}catch(error){
    throw new Error(`Error getProductByCode: ${error.message}`);
    }
}

export async function getProductsByName(name) {
  try {
    console.log(name);
      const product = await Product.find({
        name: { '$regex': `${name}`,'$options':'i'}, });
      if (!product) {
        return { message: `Product not found with code: ${code}`};
      }
      return product;
}catch(error){
  throw new Error(`Error getProductsByName: ${error.message}`);
  }
}


export async function createProduct(product,imagen) {
    const { code, name, description, characteristics, ingredients, presentations, preparationInstructions} = product;
  try {
    const newProduct = await Product.create({
      code: code,
      name: name,
      description:
      description,
      imagen: imagen,
      characteristics: characteristics,
      ingredients: ingredients,
      presentations: presentations,
      preparationInstructions: preparationInstructions
    });
    return newProduct;

  } catch (error) {
    throw new Error(`Error createProduct: ${error.message}`);
  }
}

export async function updateProduct(product,updateData) {
  try {
    const { name, description, imagen, characteristics, ingredients, presentations, preparationInstructions} = updateData;
    product.name = name || product.name;
    product.description = description || product.description;
    product.imagen = imagen || product.imagen;
    product.characteristics = characteristics || product.characteristics;
    product.ingredients = ingredients || product.ingredients;
    product.presentations = presentations || product.presentations;
    product.preparationInstructions = preparationInstructions || product.preparationInstructions;
    await product.save();
    return product;
  } catch (error) {
    throw new Error(`Error updateProduct: ${error.message}`);
  }
}

export async function destroyProduct(code) {
  try {
    const product = await Product.findOneAndDelete({ code: code });
    if (!product) {
      return { message: `Product not found with code: ${code}`};
    }
  } catch (error) {
    throw new Error(`Error destroyProduct: ${error.message}`);
  }
}