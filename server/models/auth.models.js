import bcrypt from "bcryptjs";
import { pool } from "../db/dbSwitch.js";
import { uuidv7 } from "uuidv7";

//registrar usuario nuevo
//agregar nombre (servidor http y BD)
const addUser = async (customer) => {
  let {
    customer_name,
    email,
    phone,
    shipping_address,
    billing_address,
    customer_password,
    img_url_customer,
  } = customer;
  customer_password = customer_password.toString();

  //generación de ID
  const custIdBody = uuidv7();
  //hash PASS
  const encryptedPass = bcrypt.hashSync(customer_password);

  // creación de [values]
  const customer_id = `cust-${custIdBody}`;
  const created_at = new Date();
  const values = [
    customer_id,
    customer_name || null,
    email,
    phone,
    encryptedPass,
    shipping_address,
    billing_address,
    img_url_customer,
    created_at,
  ];
  const query =
    "INSERT INTO customer (customer_id, customer_name, email, phone, customer_password, shipping_address, billing_address, img_url_customer, created_at) VALUES  ($1,  $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *";
  const { rows } = await pool.query(query, values);
  return rows;
};

const updateUser = async (id, customer) => {
  let {
    customer_name,
    email,
    phone,
    customer_password,
    shipping_address,
    billing_address,
    img_url_customer,
  } = customer;

  const encryptedPass = "";

  if (customer_password) {
    encryptedPass = bcrypt.hashSync(customer_password);
  }

  const updated_at = new Date();
  const values = [
    customer_name || null,
    email,
    phone,
    encryptedPass,
    shipping_address || "",
    billing_address || "",
    updated_at,
    img_url_customer,
    id,
  ];
  //agregar
  const query =
    "UPDATE customer SET customer_name = COALESCE($1, customer_name), email = COALESCE($2,email), phone = ($3, phone) customer_password = COALESCE($4,customer_password), shipping_address = COALESCE($5,shipping_address), billing_address = COALESCE($6, billing_address), COALESCE($7, img_customer_url),updated_at = ($8) WHERE customer_id = $9 RETURNING *";
  const { rows } = await pool.query(query, values);
  return rows[0];
};

////////////////////

//hacer login   //jwt
// podría ser con customer_id (a implementar)
const verifyUser = async (email, customer_password) => {
  const query = "SELECT * FROM customer WHERE email = $1";
  const {
    rows: [customer],
    rowCount,
  } = await pool.query(query, [email]);

  if (rowCount === 0) {
    throw {
      code: 401,
      message: "Usuario no encontrado",
    };
  }

  const { customer_password: encryptedPass } = customer;
  const rightPass = bcrypt.compareSync(customer_password, encryptedPass);

  if (!rightPass || !rowCount) {
    throw {
      code: 401,
      message: "Email o contraseña incorrectas",
    };
  }
  return customer;
};

//obtener perfilde usuario  //jwt
const getUserData = async (customer) => {
  //headers
  const query = "SELECT * FROM customer WHERE customer_id = $1";
  const { rows: customerRows, rowCount } = await pool.query(query, [
    customer.id,
  ]);

  if (rowCount === 0) {
    throw {
      code: 404,
      message: "Customer not found",
    };
  }

  return customerRows[0];
};

//Eliminación de propio perfil por parte de cliente
const deleteUser = async (id) => {
  const query = "DELETE FROM customer WHERE customer_id = $1";
  const { rows, rowCount } = await pool.query(query, [id]);

  if (rowCount === 0) {
    throw {
      code: 401,
      message: "Usuario no encontrado",
    };
  }

  return rows[0];
};

const authModel = {
  addUser,
  updateUser,
  verifyUser,
  getUserData,
  deleteUser,
};

export default authModel;
