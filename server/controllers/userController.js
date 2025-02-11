import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { userValidationSchema } from "../models/User.js";
import {
  getUserBy,
  createNewUser,
  findUserByEmail,
} from "../services/userService.js";

async function createUser(req, res) {
  try {
    const userData = userValidationSchema.parse(req.body); // Zod  validation

    const { email, password } = userData;
    const { confirmPassword } = req.body;

    //Validate that password and confirPassword match
    if (password !== confirmPassword) {
      console.log(password, confirmPassword);
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const existingUser = await findUserByEmail(email);
    console.log(existingUser);
    if (!existingUser) {
      await createNewUser({ ...userData });
      return res.status(201).json({ message: "User created" });
    }
    if (existingUser && existingUser.deletedAt === null) {
      return res.status(409).json({ message: "The user already exists" });
    }

    if (existingUser) {
      existingUser.deletedAt = null;
      existingUser.password = password;
      await existingUser.save();
      return res.status(201).json({ message: "User recreated" });
    }

    return res.status(500).json({ message: "Unexpected error occurred" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: error.errors.map((err) => err.message).join(", "), //Show validation errors
      });
    }

    return res.status(400).json({
      message: error.errors ? error.errors[0].message : error.message,
    });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    console.log("findUserByemail-->", user);
    if (!user || user.deletedAt !== null) {
      return res.status(404).json({ message: "User not found or deleted" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Passwords do not match" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export { createUser, login };
