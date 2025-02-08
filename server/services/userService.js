import { User } from "../models/User.js";

async function getUserBy(userId) {
  try {
    const user = await User.findOne({ _id: userId, deletedAt: { $eq: null } });
    return user;
  } catch (error) {
    throw new Error("Error al obtener el usuario: ", error);
  }
}

async function findUserByEmail(email) {
  try {
    console.log("findUserByEmail:--->", email);
    const user = await User.findOne({
      email: email.toLowerCase(),
      deletedAt: { $eq: null },
    });
    console.log("User-->", user);
    return user;
  } catch (error) {
    throw new Error(`Error finding user by email: ${error.message}`);
  }
}

async function createNewUser(userData) {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
}

export { getUserBy, findUserByEmail, createNewUser };
