import dotenv from "dotenv";
import authModel from "../models/auth.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { pool } from "../db/db.js";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

//create
//"cambie el INSERT dentro de authModel.addUser.
// le agrege el name, phone y las direcciones para que dejen de llegar como NULL a Neon".
const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    phone,
    shipping_address,
    billing_address,
    profile_image,
  } = req.body;

  try {
    const query = `
    INSERT INTO customer (customer_id, name, email, password, phone, shipping_address, billing_address, profile_image) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
    RETURNING *;
  `;
    // Encriptar antes de guardar
    const hashedPassword = bcrypt.hashSync(password, 10);

    const customer_id = `cust-${Math.floor(Math.random() * 10000)}`;
    const values = [
      customer_id,
      name,
      email,
      hashedPassword,
      phone,
      shipping_address,
      billing_address,
      profile_image,
    ];
    const { rows } = await pool.query(query, values);
    return res.status(201).json({
      message: "Usuario registrado exitosamente",
      user: rows[0], // Ahora sí 'rows' existe porque lo definimos arriba
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

///add to routes?
const modifyUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, phone } = req.body;

    const result = await authModel.updateUser(id, req.body);

    return res.status(200).json(result);
  } catch (error) {
    console.error("DETALLE DEL ERROR:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//login
const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const customer = await authModel.verifyUser(email, password);
    const token = jwt.sign({ id: customer.customer_id, email }, `${SECRET}`);
    return res.status(200).json({
      token,
      user: {
        customer_id: customer.customer_id,
        email: customer.email,
        name: customer.name,
        shipping_address: customer.shipping_address,
        billing_address: customer.billing_address,
        phone: customer.phone,
        profile_image: customer.profile_image,
      },
    });
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
    const { email } = req.user;
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
