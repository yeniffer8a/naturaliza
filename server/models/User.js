import bcrypt from "bcryptjs";
import { Schema, model } from "mongoose";
import { z } from "zod";

//User Validation
const userValidationSchema = z.object({
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
  password: z
    .string()
    .min(8, "The password must have at least 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/,
      "The password must have at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
  role: z.enum(["client", "salesforce", "guest"]).default("client"),
  registered: z.boolean().default(true),
});

//User Schema
const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    postCode: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["client", "salesforce", "guest"],
      default: "client",
    },
    registered: { type: Boolean, required: true, default: true },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // Hash password
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  }
  next();
});

const User = model("User", userSchema);

export { User, userValidationSchema };
