import { pool } from "../db/db.js";
import pkg from "pg-format";
//ver ordenes de compra  //ADMIN
const findOrders = async () => {
  const query = "SELECT * FROM order_total";
  const { rows } = await pool.query(query);
  return rows;
};

//Ver una compra específica  //ADMIN
const findOrdersById = async (id) => {
  const query = "SELECT * FROM order_total WHERE order_total_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

//Ver una compra específica (cliente)
const findOrdersByCustomer = async (id) => {
  const query = "SELECT * FROM order_total WHERE order_total_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

//Crear Compra
const createOrders = async ({ id_customer }) => {
  //dummy id
  const order_id = `order-${Math.floor(Math.random() * 3000)}`;

  //subquery to calculate total
  const { rows: cartData } = await pool.query(
    "SELECT ci.product_id, ci_quantity, p.price FROM cart_items ci JOIN products p ON ci.id_product = p.product_id WHERE ci.id_customer = $1",
    [id_customer],
  );

  const total = cartData.reduce(
    (sum, item) => sum + item.price * item.quantity,
  );

  const is_paid = true;
  const is_shipped = false;
  const created_at = new Date();

  const query = "INSERT INTO order_total (id_customer, total, is_paid, is_shipped, created_at) values($1, $2, $3, $4, $5) RETURNING *";
  const values = [
    order_id,
    customer_id,
    total,
    is_paid,
    is_shipped,
    created_at,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

//Editar Compra  /////////////////REVISAR!!!!!
const updateOrder = async (id) => {
  const updated_at = new Date();
  const query =
    "UPDATE product SET, total = $1, is_paid = $2, is_shipped = $3, created_at = $4, updated_at = $5 WHERE order_id = $6 AND customer_id = $7 RETURNING *";
  const values = [
    total,
    is_paid,
    is_shipped,
    created_at,
    updated_at,
    order_id,
    customer_id,
  ];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

//Eliminar Compra ?  IN CASE IS NEEDED JUST BY ADMIN
/* 
const deleteOrder = async(id)=>{
  const query = "DELETE order WHERE review_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}
 */
const orderModel = {
  findOrders,
  findOrdersById,
  createOrders,
  updateOrder,
  //deleteOrder,
};

export default orderModel;
