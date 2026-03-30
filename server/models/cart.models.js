import { pool } from "../db/db.js";
import { uuidv7 } from "uuidv7";

//Leer todos carritos  (ADMIN)
const findallCarts = async () => {
  const query = "SELECT * FROM cart";
  const { rows } = await pool.query(query);
  return rows;
};

//Leer carrito por (ADMIN)
const findCartById = async (id) => {
  const query = "SELECT * FROM cart WHERE cart_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

//Atención al modelado (created_at, updated_at).
//CUSTOMER CART INSTANCE
const findCartByCustomer = async (id) => {
  const query =
    "SELECT c.cart_id, ci.id_product, ci.id_cart, quantity FROM cart c JOIN cart_item ci ON c.cart_id = ci.id_cart WHERE id_customer = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

////////Ver detalle de compra

const findCartDetails = async () => {
  const query = "SELECT * FROM cart_item";
  const { rows } = await pool.query(query);
  return rows;
};
const findCartDetailsbyId = async (id) => {
  const query = "SELECT * FROM cart_item WHERE id_cart = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

///PRODUCT MANAGING

const createCartInstance = async (id) => {
  const id_customer = id;

  //Borrar carritos previos
  await pool.query(
    "DELETE FROM cart_item WHERE id_cart IN (SELECT cart_id FROM cart WHERE id_customer = $1)",
    [id_customer],
  );
  await pool.query("DELETE FROM cart WHERE id_customer = $1", [id_customer]);

  //Crear una instancia de carrito
  const cartIdBody = uuidv7()
  const cart_id = `cart-${cartIdBody}`;
  const created_at = new Date();
  const is_active = true;
  const { rows: cartToCheck } = await pool.query(
    "INSERT INTO cart (cart_id, id_customer, is_active, created_at) VALUES ($1, $2, $3, $4) RETURNING *",
    [cart_id, id_customer, is_active, created_at],
  );
  return cartToCheck[0];
};

//require id_product from cart_item

const addProductToCart = async (id, newCartProduct) => {
  //cart_item payload
  const { id_product, quantity } = newCartProduct;
  const customer_id = id;
  const { rows: cartResult } = await pool.query(
    "SELECT cart_id FROM cart WHERE id_customer = $1",
    [customer_id],
  );
  const cart_id = cartResult[0].cart_id;

  //generate cart_item id
  const cartItemIdBody = uuidv7()
  let cart_item_id = `cart-item-${cartItemIdBody}`;

  const created_at = new Date();

  //create query
  const values = [cart_item_id, cart_id, id_product, quantity, created_at];
  const query =
    "INSERT INTO cart_item (cart_item_id, id_cart, id_product, quantity, created_at) values($1, $2, $3, $4, $5) RETURNING *";
  const { rows: newProduct } = await pool.query(query, values);
  return newProduct[0];
};

const updateCartProduct = async (id, product) => {
  const newQuantity = product.quantity;

  const { rows: cartRows } = await pool.query(
    "SELECT cart_id FROM cart WHERE  id_customer = $1",
    [id],
  );
  if (cartRows.length === 0) {
    throw { code: 404, message: "Cart not found" };
  }
  const cart_id = cartRows[0].cart_id;

  const product_id = product.id_product;

  const { rows: cart_itemRows } = await pool.query(
    "SELECT cart_item_id FROM cart_item WHERE id_cart = $1 AND id_product = $2",
    [cart_id, product_id],
  );

  if (cart_itemRows.length === 0) {
    throw { code: 404, message: "Cart Item not found" };
  }
  const cart_item_id = cart_itemRows[0].cart_item_id;

  const { rows: updatedProduct } = await pool.query(
    "UPDATE cart_item SET quantity = $1 WHERE id_cart = $2 AND cart_item_id = $3 AND id_product = $4 RETURNING *",
    [newQuantity, cart_id, cart_item_id, product_id],
  );
  return updatedProduct[0];
};

const deleteProductFromCart = async (id, productToDelete) => {
  const { rows: cartRows } = await pool.query(
    "SELECT cart_id FROM cart WHERE  id_customer = $1",
    [id],
  );
  if (cartRows.length === 0) {
    throw { code: 404, message: "Cart not found" };
  }
  const cart_id = cartRows[0].cart_id;

  const product_id = productToDelete.id_product;

  const { rows: cart_itemRows } = await pool.query(
    "SELECT cart_item_id FROM cart_item WHERE id_cart = $1 AND id_product = $2",
    [cart_id, product_id],
  );

  if (cart_itemRows.length === 0) {
    throw { code: 404, message: "Cart Item not found" };
  }
  const cart_item_id = cart_itemRows[0].cart_item_id;

  const { rowCount } = await pool.query(
    "DELETE FROM cart_item WHERE id_cart = $1 AND cart_item_id = $2 AND id_product = $3",
    [cart_id, cart_item_id, product_id],
  );
  if (rowCount === 0) {
    throw { code: 404, message: "No item to delete" };
  }

  return { message: "Item deleted successfully" };
};

//Eliminar carrito  //ADMIN
const deleteCart = async (id) => {
  const query = "DELETE FROM cart WHERE cart_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const cartModel = {
  //Lecturas de carrito
  findallCarts,
  findCartById,
  findCartDetails,
  findCartDetailsbyId,
  findCartByCustomer,

  //carrito por producto
  createCartInstance,
  addProductToCart,
  updateCartProduct,
  deleteProductFromCart,

  //Admin
  deleteCart,
};

export default cartModel;
