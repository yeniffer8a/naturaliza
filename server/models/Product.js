import {Schema, model} from "mongoose";
import { z } from "zod";

export const procdutValidation = z.object({
  code: z.string().nonempty({message: "Codigo no debe estar vacio"}),
  name: z.string().nonempty({message: "Nombre no debe estar vacio"}).min(5, {message: "Nombre debe tener minimo 5 caracteres"}),
  description: z.string().nonempty({message:"Descripcion no debe estar vacio"}).min(20, {message: "Descripcion debe tener minimo 20 caracteres"}),
  characteristics: z.object({
    origin: z.string().nonempty({message: "Origen no debe estar vacio"}),
    type: z.string().nonempty({message: "Tipo no debe estar vacio"}),
    flavor: z.string().nonempty({message: "Sabor no debe estar vacio"}),  
    properties: z.string().nonempty({message: "Propiedades no debe estar vacio"}),
    caffeineContent: z.string().nonempty({message: "Contenido de cafeina no debe estar vacio"}),
    allergens: z.string().nonempty({message: "Alérgenos no debe estar vacio"}),
    organicCertification: z.boolean().default(false),
  }),
  ingredients: z.string().nonempty({message: "Ingredientes no debe estar vacio"}),
  presentations: z.array(
    z.object({
      size: z.string().nonempty({message: "Tamaño no debe estar vacio"}),
      price: z.number().positive({  message: "Precio debe ser un numero positivo"}),
      stock: z.number().int().positive({  message: "Stock debe ser un numero positivo"}),
    })
  ),
  preparationInstructions: z.object({
    recommendedPortion: z.string().nonempty('Porcion recomendada no debe estar vacio'),
    waterTemperature: z.string().nonempty('Temperatura del agua no debe estar vacio'),
    infusionTime: z.string().nonempty('Tiempo de infusion no debe estar vacio'),
    aditionalInfo: z.string().nonempty('Informacion adicional no debe estar vacio'),
  }),
});

const productSchema = Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    imagen: {
      type: String,
      required: true,
    },
    characteristics: {
      origin: {
        type: String,
        required: true,
        trim: true,
      },
      type: {
        type: String,
        required: true,
      },
      flavor: {
        type: String,
        required: true,
      },
      properties: {
        type: String,
        required: true,
      },
      caffeineContent: {
        type: String,
        required: true,
      },
      allergens: {
        type: String,
        required: true,
      },
      organicCertification: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    ingredients: {
      type: String,
      required: true,
    },
    presentations: [
      {
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        stock: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],
    preparationInstructions: {
      recommendedPortion: {
        type: String,
        required: true,
      },
      waterTemperature: {
        type: String,
        required: true,
      },
      infusionTime: {
        type: String,
        required: true,
      },
      aditionalInfo: {
        type: String,
        required: true,
      },
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Product = model("Product", productSchema);

export default Product;
