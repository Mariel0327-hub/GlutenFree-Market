import dotenv from "dotenv";
import authModel from "../models/auth.models.js";
import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

//create
const registerUser = async (req, res) => {
  const customer = req.body;
  try {
    await authModel.addUser(customer);
    return res.status(201).json({ message: "Usuario registrado exitosamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

///add to routes?
const modifyUser = async (req, res) => {
  const { id } = req.params;
  const customer = req.body;
  try {
    /*     const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer")[1];
    jwt.verify(token, `${SECRET}`); */
    const result = await authModel.updateUser(id, customer);

        if (!result) {
      return res.status(404).json({ message: "No Customer Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//login
const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await authModel.verifyUser(email, password);
    const token = jwt.sign({ id: customer.customer_id, email }, `${SECRET}`);
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//profile
const getUserProfile = async (req, res) => {
  try {
    /*     const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer ")[1];
    jwt.verify(token, `${SECRET}`); */
    const  customer  = req.user;
    const result = await authModel.getUserData(customer);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Eliminación de propio perfil por parte de cliente
const deleteNewUser = async (req, res) => {
  try {
    const { id } = req.user;

    await authModel.deleteUser(id);

    console.log(`Cliente ${id}, eliminadx exitosamente`);
    return res
      .status(200)
      .json({ message: `Cliente ${id}, eliminadx exitosamente` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const authController = {
  registerUser,
  modifyUser, 
  authenticateUser,
  getUserProfile,
  deleteNewUser,
};

export default authController;
