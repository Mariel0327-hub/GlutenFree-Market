import { pool } from "../db/dbSwitch.js";
import { uuidv7 } from "uuidv7";
import format from "pg-format";

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

//Eliminar cliente  //ADMIN
const deleteCustomer = async (id) => {
  const query = "DELETE FROM customer WHERE customer_id = $1 RETURNING *";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

//FAVORITOS

//ver favoritos  //ADMIN
 const findFavorites = async () => {
  const query = "SELECT * FROM favorites";
  const { rows } = await pool.query(query);
  return rows;
};

const findFavoritesFiltered = async ({ limit = 10, order_by }) => {
  //Se crean alias para procesar las columnas (para obviar underscore)
  const FIELD_FAV_ALIAS = {
    favoritesid : 'favorites_id',
    idcustomer : 'id_customer',
    idproduct: 'id_product',
    createdat : 'created_at',
    updatedat :'updated_at'
  } 
  
  const [alias, dir] = order_by.split("_");
  const campo = FIELD_FAV_ALIAS[alias] || alias
  const queryFormat = format(
    "SELECT * FROM favorites ORDER BY %I %s LIMIT %L",
    campo,
    dir,
    limit,
  );
  const { rows: filters } = await pool.query(queryFormat);
  return filters;
};

//Ver favorito en específico  //ADMIN
const findFavoritesById = async (id) => {
  const query = "SELECT * FROM favorites WHERE favorites_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}; 

//Crear Favorito (obtener id directo del token)
const createFavorites = async (email, favProduct) => {
  
  //id
  const favIdBody = uuidv7();
  const favorites_id = `fav-${favIdBody}`;

  //id_customer:
  const { rows: customerRows, rowCount } = await pool.query(
    "SELECT customer_id FROM customer WHERE email = $1",
    [email],
  );

  if (rowCount === 0) {
    throw { code: 404, message: "Customer not found" };
  }

  const id_customer = customerRows[0].customer_id;
  //const created_at = new Date();  a implementar proximamente

  const created_at = new Date();

  const values = [favorites_id, id_customer, favProduct.id_product, created_at];

  const { rows: favRows } = await pool.query(
    "INSERT INTO favorites (favorites_id, id_customer, id_product, created_at) values($1, $2, $3, $4) RETURNING *",
    values,
  );

  return favRows;
};

//Editar FAVORITOS
const updateFavorites = async (id) => {

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

  const values = [ id_customer, favProduct, updated_at];

  const { rows: favRows } = await pool.query(
    "UPDATE favorites SET (id_customer = COALESCE($1, id_customer), id_product = COALESCE($2, id_product), updated_at = $3) values($1, $2, $3) RETURNING *",
    values,
  );

  return favRows[0];
};

//Eliminar favorito
const deleteFavorite = async (id) => {
  const query = "DELETE FROM favorites WHERE favorites_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
const customerModel = {
  //view customers (rutas sobre clientes no relacionadas con clientes para uso de ADMIN)
  findCustomers,
  findCustomerById,
  deleteCustomer,

  //favoritos
  findFavorites,
  findFavoritesFiltered,
  findFavoritesById,
  createFavorites,
  updateFavorites,
  deleteFavorite,
};

export default customerModel;
