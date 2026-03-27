import { pool } from "../db/db.js";
import pkg from "pg-format";

///////////REHACER PARA CRUD DDE FAVORITOS Y SEGUIMIENTO DE CLIENTES

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
  const query = "SELECT * FROM order_total WHERE id_customer = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

//Crear Compra
const createOrders = async (email) => {
  //dummy id
  const order_total_id = `order-t-${Math.floor(Math.random() * 3000)}`;

  //id_customer:
    const { rows: customerRows, rowCount } = await pool.query(
    "SELECT customer_id FROM customer WHERE email = $1",
    [email]
  );

  if (rowCount === 0) {
    throw { code: 404, message: "Customer not found" };
  }

  const id_customer = customerRows[0].customer_id;


  //subquery to calculate total
  const { rows: cartData, dataRowCount } = await pool.query(
    "SELECT ci.id_product, ci.quantity, p.price FROM cart_item ci JOIN product p ON ci.id_product = p.product_id WHERE ci.id_cart = (SELECT cart_id FROM cart WHERE id_customer = $1)",
    [id_customer],
  );

  if(cartData.length === 0){
    throw {code : 400, message: "Cannot create and order with an empty cart"}
  }

  const total = cartData.reduce(
    (sum, item) => sum + (Number(item.price) * Number(item.quantity)),0
  );

  const is_paid = false;
  const is_shipped = false;
  const created_at = new Date();
  const order_date = new Date();

  const values = [
    order_total_id,
    id_customer,
    total,
    order_date,
    is_paid,
    is_shipped,
    created_at
  ];

  const { rows: orderRows } = await pool.query("INSERT INTO order_total (order_total_id, id_customer, total, order_date, is_paid, is_shipped, created_at) values($1, $2, $3, $4, $5, $6, $7) RETURNING *", values);

  const newOrder = orderRows[0];


for (const item of cartData) {

    const order_item_id = `order-it-${Math.floor(Math.random() * 3000)}`;

    const itemValues = [order_item_id, newOrder.order_total_id, item.id_product, item.quantity, item.price];
    await pool.query( "INSERT INTO order_item (order_item_id,id_order_total, id_product, quantity, unit_price) values($1, $2, $3, $4, $5)", itemValues);
  }
 

  await pool.query("DELETE FROM cart_item WHERE id_cart = (SELECT cart_id FROM cart WHERE id_customer =$1)", [id_customer])

  return newOrder
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

//Eliminar orden de compra (ADMIN)
const deleteOrder = async(id)=>{
  const query = "DELETE FROM order_total WHERE order_total_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}
const customerModel = {
  findOrders,
  findOrdersById,
  findOrdersByCustomer,
  createOrders,
  updateOrder,
  deleteOrder,
};

export default customerModel;
