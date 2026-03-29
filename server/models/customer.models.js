import { pool } from "../db/db.js";
import pkg from "pg-format";

//CUSTOMERS
//ver clientes  //ADMIN
const findCustomers = async () => {
  const query = "SELECT * FROM customer";
  const { rows } = await pool.query(query);
  return rows;
};

//Ver cliente en específico  //ADMIN
const findCustomerById = async (id) => {
  const query = "SELECT * FROM customer WHERE customer_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

/* //Eliminar cliente  //ADMIN
const deleteCustomer = async (id) => {
  const query = "DELETE FROM customer WHERE customer_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}; */

//FAVORITOS

//ver clientes  //ADMIN
const findFavorites = async () => {
  const query = "SELECT * FROM favoritos";
  const { rows } = await pool.query(query);
  return rows;
};

//Ver cliente en específico  //ADMIN
const findFavoritesById = async (id) => {
  const query = "SELECT * FROM favoritos WHERE favoritos_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

//Crear Favorito
const createFavorites = async (email, favProduct) => {
  //dummy id
  const favoritos_id = `fav-${Math.floor(Math.random() * 3000)}`;

  //id_customer:
  const { rows: customerRows, rowCount } = await pool.query(
    "SELECT customer_id FROM customer WHERE email = $1",
    [email],
  );

  if (rowCount === 0) {
    throw { code: 404, message: "Customer not found" };
  }

  const id_customer = customerRows[0].customer_id;
  favProduct = id_product;
  const created_at = new Date();

  const values = [favoritos_id, id_customer, favProduct, created_at];

  const { rows: favRows } = await pool.query(
    "INSERT INTO favorites (favoritos_id, id_customer, id_product, created_at) values($1, $2, $3, $4) RETURNING *",
    values,
  );

  return favRows;
};

//Editar Compra  /////////////////REVISAR!!!!!
const updateFavorites = async (id) => {
  //dummy id
  const favoritos_id = `fav-${Math.floor(Math.random() * 3000)}`;

  //id_customer:
  const { rows: customerRows, rowCount } = await pool.query(
    "SELECT customer_id FROM customer WHERE email = $1",
    [email],
  );

  if (rowCount === 0) {
    throw { code: 404, message: "Customer not found" };
  }

  const id_customer = customerRows[0].customer_id;
  const favProduct = id_product;
  const updated_at = new Date();

  const values = [favoritos_id, id_customer, favProduct, updated_at];

  const { rows: favRows } = await pool.query(
    "UPDATE favorites SET (favoritos_id = COALESCE($1, favoritos_id), id_customer = COALESCE($2, id_customer), id_product = COALESCE($3, id_product),updated_at) values($1, $2, $3, $4) RETURNING *",
    values,
  );

  return favRows[0];
};

//Eliminar orden de compra (ADMIN)
const deleteFavorite = async (id) => {
  const query = "DELETE FROM favoritos WHERE favoritos_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
const customerModel = {
  //view customers (rutas sobre clientes no relacionadas con clientes para uso de ADMIN)
  findCustomers,
  findCustomerById,


  //favoritos
  findFavorites,
  findFavoritesById,
  createFavorites,
  updateFavorites,
  deleteFavorite,
};

export default customerModel;
