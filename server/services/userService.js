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
    const user = await User.findOne({
      email: email.toLowerCase(),
      deletedAt: { $eq: null },
    });
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

async function updateNewUser(user, userData) {
  try {
    const { firstName, lastName, email, address, country, city, postCode } = userData;
    user.firstName = firstName;
    user.lastName = lastName;
    user.email = email.toLowerCase();
    user.address = address;
    user.country = country;
    user.city = city;
    user.postCode = postCode;
    await user.save();
    return {message:`User updated:`};
  } catch (error) {
    throw new Error(`Error updating user: ${error.message}`);
  }
}

async function deleteUser(user) {
  try {
    user.deletedAt = new Date();
    await user.save();
    return { message: `User with email: ${user.email} deleted` };
  } catch (error) {
    throw new Error(`Error deleting user: ${error.message}`);
  }
}



export { getUserBy, findUserByEmail, createNewUser, updateNewUser, deleteUser };
