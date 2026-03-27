import { pool } from "../db/db.js";
import pkg from "pg-format";

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
  const query = "SELECT c.cart_id, ci.id_product, ci.id_cart, quantity FROM cart c JOIN cart_item ci ON c.cart_id = ci.id_cart WHERE id_customer = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};


////////Ver detalle de compra

const findCartDetails = async () =>{
    const query = "SELECT * FROM cart_item";
  const { rows } = await pool.query(query);
  return rows;
}
const findCartDetailsbyId = async (id) =>{
  const query = "SELECT * FROM cart_item WHERE id_cart = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
}

//////////////////

//Crear Instnacia de Carrito (Cliente al hacer checkout)
const createCart = async (email, cart) => {

  //obtener customer_id usando el token
  const { rows, rowCount } = await pool.query(
    "SELECT customer_id from customer WHERE email = $1",
    [email],
  );

  if (rowCount.length === 0) {
    throw { code: 404, message: "Customer not found" };
  }

  const id_customer = rows[0].customer_id;

  // borrar carritos previos
  await pool.query("DELETE FROM cart_item WHERE id_cart IN (SELECT cart_id FROM cart WHERE id_customer = $1)", [id_customer]);
  await pool.query("DELETE FROM cart WHERE id_customer = $1", [id_customer]);

  //Crear una instancia de carrito
  const cart_id = `cart-${Math.floor(Math.random() * 3000)}`;
  const created_at = new Date();
  const is_active = true;
  const cartToCheck = await pool.query(
    "INSERT INTO cart (cart_id, id_customer, is_active, created_At) VALUES ($1, $2, $3, $4) RETURNING *",
    [cart_id, id_customer, is_active, created_at],
  );

  //se tiene que validar el carrito (por su hubiera un localStorage alterado)
  //Se hace un loop sobre el carrito y sus productos para adicionar items a la instancia de carrito recibida del front.
  const itemDetail = []
  for (const item of cart) {
    let cart_item_id = `cart-item-${Math.floor(Math.random() * 9000)}`;
    const query =
      "INSERT INTO cart_item (cart_item_id, id_cart, id_product, quantity) values($1, $2, $3, $4) RETURNING *";
    const values = [cart_item_id, cart_id, item.id_product, item.quantity];
    const {rows: detailRows} = await pool.query(query, values);
    itemDetail.push(detailRows[0])
  }
  
  //se notifica el carrito y su detalle.
  console.log(
    `Cart ${cart_id} Created and up to date for customer ${id_customer}`,
  );
  return{
    cart: cartToCheck[0],
    items: itemDetail
  }
};

/* //Editar Carrito  //ADMIN

const updateCart = async (id) => {
  
  //get the actual cart (select cart by customer_id)


  //update info of that cart:
    -// add update_at;
    -// changes in products (product o quantity) / payload
    -//changes in activity / payload
    -//
  //return the cart with its detail
  
  };
 */

//Eliminar carrito  //ADMIN
const deleteCart = async (id) => {
  const query = "DELETE FROM cart WHERE cart_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const cartModel = {
  findallCarts,
  findCartById,
  findCartDetails,
  findCartDetailsbyId,
  findCartByCustomer,
  createCart,
  //updateCart,
  deleteCart,
};

export default cartModel;
