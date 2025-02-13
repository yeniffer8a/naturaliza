import Product from "../models/Product.js";

export async function getProducts() {
  try {
    const products = await Product.find({deletedAt: { $eq: null }});
    return products;
  } catch (error) {
    throw new Error(`Error getProducts: ${error.message}`);
  }
}

export async function getProductByCode(code) {
    try {
        const product = await Product.findOne({ code: code });
        if (!product) {
          return `Product not found with code: ${code}`;
        }
        return product;
}catch(error){
    throw new Error(`Error getProductByCode: ${error.message}`);
    }
}

export async function getProductsByName(name) {
  try {
      const product = await Product.find({
        name: { '$regex': `${name}`,'$options':'i'}, deletedAt: { $eq: null }});

      if (product === undefined || product.length == 0) {
       return (`Product not found with word: ${name}`);
      }
      return product;
}catch(error){
  throw new Error(`Error getProductsByName: ${error.message}`);
  }
}


export async function createProduct(product,image) {
    const { code, name, description, characteristics, ingredients, presentations, preparationInstructions} = product;
  try {
    const newProduct = await Product.create({
      code: code,
      name: name,
      description:
      description,
      image: image,
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

export async function updateProduct(product,updateData,image) {
  try {
    const { name, description, image, characteristics, ingredients, presentations, preparationInstructions} = updateData;
    product.name = name || product.name;
    product.description = description || product.description;
    product.image = image || product.image;
    product.characteristics = characteristics || product.characteristics;
    product.ingredients = ingredients || product.ingredients;
    product.presentations = presentations || product.presentations;
    product.preparationInstructions = preparationInstructions || product.preparationInstructions;
    await product.save();
    return {message:`Product with code: ${product.code} updated`};
  } catch (error) {
    throw new Error(`Error updateProduct: ${error.message}`);
  }
}

export async function destroyProduct(product) {
  try {
   
      product.deletedAt = Date.now();
      await product.save();
      return {message:`Product with code: ${product.code} deleted`};

  } catch (error) {
    throw new Error(`Error destroyProduct: ${error.message}`);
  }
}