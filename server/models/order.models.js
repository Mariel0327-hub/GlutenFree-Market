import { pool } from "../db/dbSwitch.js";
import { uuidv7 } from "uuidv7";

//ver ordenes de compra  //ADMIN
const findOrders = async () => {
  const query = "SELECT * FROM order_total";
  const { rows } = await pool.query(query);
  return rows;
};

//Ver una compra específica  //ADMIN  ??cliente?
const findOrdersById = async (id) => {
  const query = "SELECT * FROM order_total WHERE order_total_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

//Ver una compra específica (cliente)
const findOrdersByCustomer = async (id) => {
  const query = "SELECT * FROM order_total WHERE id_customer = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

////////Ver detalle de compra

//ADMIN
const findOrderDetails = async () => {
  const query = "SELECT * FROM order_item";
  const { rows } = await pool.query(query);
  return rows;
};
const findOrderDetailsbyId = async (id) => {
  const query = "SELECT oi*, p.title FROM order_item JOIN product p ON p.product_id = oi.id_product oi WHERE id_order_total = $1 ";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

//CLIENTE (restringido via id_customer obtenido en token)
const findOrderDetailsbyCustomer = async (id, order_total_id) => {
  const values = [order_total_id, id]
  const query = "SELECT oi.*, p.title FROM order_item oi JOIN product p ON p.product_id = oi.id_product JOIN order_total ot ON ot.order_total_id = oi.id_order_total WHERE oi.id_order_total = $1 AND ot.id_customer = $2" ;
  const { rows } = await pool.query(query, values);
  return rows;
};

//////////////////

//Crear Compra
const createOrders = async (id) => {
  const orderTotalIdBody = uuidv7();
  const order_total_id = `order-t-${orderTotalIdBody}`;

  //id_customer:
  const { rows: customerRows, rowCount } = await pool.query(
    "SELECT customer_id FROM customer WHERE customer_id = $1",
    [id],
  );

  if (rowCount === 0) {
    throw { code: 404, message: "Customer not found" };
  }

  const id_customer = customerRows[0].customer_id;

  //subquery to calculate total
  const { rows: cartData } = await pool.query(
    "SELECT ci.id_product, ci.quantity, p.price FROM cart_item ci JOIN product p ON ci.id_product = p.product_id WHERE ci.id_cart = (SELECT cart_id FROM cart WHERE id_customer = $1)",
    [id_customer],
  );

  if (cartData.length === 0) {
    throw { code: 400, message: "Cannot create and order with an empty cart" };
  }

  const total = cartData.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0,
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
    created_at,
  ];

  const { rows: orderRows } = await pool.query(
    "INSERT INTO order_total (order_total_id, id_customer, total, order_date, is_paid, is_shipped, created_at) values($1, $2, $3, $4, $5, $6, $7) RETURNING *",
    values,
  );

  const newOrder = orderRows[0];

  for (const item of cartData) {
    //CREATE ORDER_ITEM
    const orderItemBody = uuidv7();
    const order_item_id = `order-it-${orderItemBody}`;
    const created_at = new Date();
    const itemValues = [
      order_item_id,
      newOrder.order_total_id,
      item.id_product,
      item.quantity,
      item.price,
      created_at,
    ];
    await pool.query(
      "INSERT INTO order_item (order_item_id,id_order_total, id_product, quantity, unit_price, created_at) values($1, $2, $3, $4, $5, $6)",
      itemValues,
    );

    //CREATE STOCK MOVEMENT
    const stockResult = await pool.query(
      "UPDATE product SET stock = stock - $1 WHERE product_id = $2 AND stock >=  $1",
      [item.quantity, item.id_product],
    );

    if (stockResult.rowCount === 0) {
      throw { code: 400, message: `No stock for product ${item.id_product}` };
    }

    //REGISTER THE MOVEMENT (stock_mov)
    const stockMoveValues = [
      order_item_id,
      item.id_product,
      "2",
      item.quantity,
      new Date(),
    ];
    await pool.query(
      "INSERT INTO stock_mov (id_order_item, id_product, id_type_mov, quantity, created_at) VALUES ($1, $2, $3, $4, $5)",
      stockMoveValues,
    );
  }

  //Eliminar carro(s) del cliente
  await pool.query(
    "DELETE FROM cart_item WHERE id_cart = (SELECT cart_id FROM cart WHERE id_customer =$1)",
    [id_customer],
  );

  return newOrder;
};

//Editar Compra  /////////////////REVISAR!!!!!
const updateOrder = async (id) => {
  const updated_at = new Date();
  const query =
    "UPDATE product SET total = COALESCE($1, total), is_paid = COALESCE($2, is_paid), is_shipped = COALESCE($3, is_shipped), created_at = COALESCE($4,created_at), updated_at = COALESCE($5,updated_at) WHERE order_id = $6 AND customer_id = $7 RETURNING *";
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
const deleteOrder = async (id) => {
  const query = "DELETE FROM order_total WHERE order_total_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};
const orderModel = {
  //order
  findOrders,
  findOrdersById,
  findOrdersByCustomer,
  createOrders,
  updateOrder,
  deleteOrder,

  //order-detail
  findOrderDetails,
  findOrderDetailsbyId,
  findOrderDetailsbyCustomer,
};

export default orderModel;
