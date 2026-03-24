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
const modifyUser = async () => {
  try {
/*     const Authorization = req.header("Authorization");
    const token = Authorization.split("Bearer")[1];
    jwt.verify(token, `${SECRET}`); */
    await authModel.updateUser();
    return res.status(200).json();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//login
const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    await authModel.verifyUser(email, password);
    const token = jwt.sign({ email }, `${SECRET}`);
    return res.status(200).json(token);
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
    const {email} = jwt.decode(token)
    const result = await authModel.getUserData(email);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const authController = {
  registerUser,
  modifyUser, // ruta nueva?
  authenticateUser,
  getUserProfile,
};

export default authController;
