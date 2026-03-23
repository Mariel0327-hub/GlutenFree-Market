import { pool } from "../db/db.js";
import pkg from "pg-format";

//Leer carrito
const findCart = async () => {
  const query = "SELECT * FROM cart_item";
  const { rows } = await pool.query(query);
  return rows;
};

//Leer carrito por id
const findCartById = async () => {};

//Creare Carrito
const createCart = async () => {};

//Editar Carrito
const updateCart = async () => {};

//Eliminar carrito
const deleteCart = async () => {};

const cartModel = {
  findCart,
  findCartById,
  createCart,
  updateCart,
  deleteCart,
};

export default cartModel;
