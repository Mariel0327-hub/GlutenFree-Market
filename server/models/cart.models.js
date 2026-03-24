import { pool } from "../db/db.js";
import pkg from "pg-format";

//Leer todos carritos  //ADMIN
const findallCarts = async () => {
  const query = "SELECT * FROM cart_item";
  const { rows } = await pool.query(query);
  return rows;
};

//Leer carrito por //ADMIN
const findCartById = async (id) => {
  const query = "SELECT * FROM cart_item WHERE cart_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

//CUSTOMER CART INSTANCE
const findCartByCustomer = async (id) => {
  const query = "SELECT * FROM cart_item WHERE id_customer = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

//Crear Carrito  //////darle una vuelta
const createCart = async (id, cart) => {
  // borrar carritos previos en caso de que existan:

  //se tiene que validar el carrito (por su hubiera un localStorage alterado)
  for (item of cart) {
    const query =
      "INSERT INTO cart_items (id_customer, id_product, quantity) values($1, $2, $3)";
    const values = [id_customer, id_customer, quantity];
    await pool.query(query, values);
  }
  console.log("Cart Created and up to date")
};

/* //Editar Carrito  //ADMIN
const updateCart = async () => {};
 */

//Eliminar carrito  //ADMIN
const deleteCart = async (id) => {
  const query = "DELETE cart WHERE review_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const cartModel = {
  findallCarts,
  findCartById,
  findCartByCustomer,
  createCart,
  //updateCart,
  deleteCart,
};

export default cartModel;
