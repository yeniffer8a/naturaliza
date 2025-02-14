import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { userValidationSchema } from "../models/User.js";
import {
  getUserBy,
  createNewUser,
  findUserByEmail,
  updateNewUser,
  deleteUser
} from "../services/userService.js";
import e from "express";

async function getUserByEmail(req,res) {
  try {
    const email = req.params.email;
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }
    return res.status(200).json({ ok: true, user });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
  
}

async function createUser(req, res) {
  try {
    const userData = userValidationSchema.parse(req.body); // Zod  validation

    const { email } = userData; 
    const emailLower= email.toLowerCase();

    if (req.body.role !== "guest") {
      const { password } = userData;
      const { confirmPassword } = req.body;

      //Validate that password and confirPassword match
      if (password !== confirmPassword) {
        console.log(password, confirmPassword);
        return res
          .status(400)
          .json({ ok: false, message: "Passwords do not match" });
      }
    }
    const existingUser = await findUserByEmail(emailLower);
    console.log(existingUser);
    if (!existingUser) {
      await createNewUser({ ...userData });
      return res.status(201).json({ ok: true, message: "User created" });
    }
    if (existingUser && existingUser.deletedAt === null) {
      return res
        .status(409)
        .json({ ok: false, message: "The user already exists" });
    }

    if (existingUser) {
      existingUser.deletedAt = null;
      existingUser.password = password;
      await existingUser.save();
      return res.status(201).json({ ok: true, message: "User recreated" });
    }

    return res
      .status(500)
      .json({ ok: false, message: "Unexpected error occurred" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        ok: false,
        message: error.errors.map((err) => err.message).join(", "), //Show validation errors
      });
    }

    return res.status(400).json({
      ok: false,
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
        .json({ ok: false, message: "Email and password are required" });
    }

    const user = await findUserByEmail(email);
    console.log("findUserByemail-->", user);
    if (!user || user.deletedAt !== null) {
      return res
        .status(404)
        .json({ ok: false, message: "User not found or deleted" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ ok: false, message: "Passwords do not match" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const userId = req.auth.id;
    const user = await getUserBy(userId);

    if (!user) {
      return res.status(404).json({ ok: false, message: "User not found" });
    }

    const userData = req.body;

    const updatedUser = await updateNewUser(user, userData);
    if (typeof updatedUser === "string") {
      return res.status(400).json({ ok: false, message: updatedUser });
    }

    return res.status(200).json({ ok: true, updatedUser });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}

async function deleteUserById(req, res) {
  try {
    const userId = req.auth.id;
    const user = await getUserBy(userId);

    const deletedUser = await deleteUser(user);
    return res.status(200).json({ ok: true, deletedUser });
  } catch (error) {
    return res.status(500).json({ ok: false, message: error.message });
  }
}

export { createUser, login, updateUser,deleteUserById,getUserByEmail};
