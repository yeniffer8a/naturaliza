import { model, Schema, Types } from "mongoose";
import { z } from "zod";

export const purchaseOrderValidator = z.object({
  orderNumber: z.number().nonnegative(),
  user: z.object({
    firstName: z
      .string()
      .min(1, "The first name must have at least 1 character")
      .max(50, "The first name cannot exceed 50 characters"),
    lastName: z
      .string()
      .min(1, "The last name must have at least 1 character")
      .max(50, "The last name cannot exceed 50 characters"),
    email: z.string().email("The email must have a valid format"),
    address: z
      .string()
      .min(1, "The address must have at least 1 character")
      .max(50, "The address cannot exceed 50 characters"),
    country: z.string().min(1).max(50),
    city: z.string().min(1).max(50),
    postCode: z.string().min(1).max(50),
  }),
  sameAddress: z.boolean(),
  products: z.array(
    z.object({
      product: z.string(),
      quantity: z
        .number()
        .nonnegative({ message: "the quantity must be greater than zero" }),
    })
  ),
  billingAddress: z.object({
    
    address: z
      .string()
      .min(1, "The address must have at least 1 character")
      .max(50, "The address cannot exceed 50 characters"),
    city: z.string().min(1).max(50),
    country: z.string().min(1).max(50),
    postCode: z.string().min(1).max(50),
  }),
  cost: z.object({
    subTotal: z.number(),
    delivery: z.number().default(0),
    total: z.number(),
  }),
  status: z
    .enum(["pending", "paid", "shipped", "delivered"])
    .default("pending"),
  paymentInfo: z.object({
    paymentMethod: z.string(),
    paymentStatus: z.string(),
    paymentDate: z.string(),
    paymentMethodNumber: z.number(),
  }),
});

const purchaseOrderSchema = Schema(
  {
    orderNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    user: {
      idUser: {
        type: Types.ObjectId,
        ref: "User",
        default: null,
      },
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
    },

    products: [
      {
        product: {
          type: Types.ObjectId,
          ref: "Product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    sameAddress: {
      type: Boolean,
      required: true,
    },
    billingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
    },
    cost: {
      subTotal: {
        type: Number,
        required: true,
      },
      delivery: {
        type: Number,
        required: true,
        default: 0,
      },
      total: {
        type: Number,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered"],
      default: "pending",
    },
    paymentInfo: {
      paymentMethod: {
        type: String,
        required: true,
      },
      paymentStatus: {
        type: String,
        required: true,
      },
      paymentDate: {
        type: Date,
        required: true,
      },
      paymentMethodNumber: {
        type: Number,
        required: true,
      },
    },
    deliveryTime: {
      type: Date,
      require: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const PurchaseOrder = model("PurchaseOrder", purchaseOrderSchema);

export default PurchaseOrder;
