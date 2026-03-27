import bcrypt from "bcryptjs";
import { pool } from "../db/db.js";
import pkg from "pg-format";




//registrar usuario nuevo
const addUser = async (customer) => {
  let { email, shipping_address, billing_address, password } = customer;
  password = password.toString();

  //hash PASS
  const encryptedPass = bcrypt.hashSync(password);
  const customer_id = `cust-${Math.floor(Math.random() * 3000)}`;
  const created_at = new Date();
  const values = [
    customer_id,
    email,
    encryptedPass,
    shipping_address,
    billing_address,
    created_at,
  ];
  const query = "INSERT INTO customer VALUES ($1,  $2, $3, $4, $5, $6)";
  const { rows } = await pool.query(query, values);
  return rows;
};

//falta udptade user
//si se cambia el password se debe cambiar el hash.

const updateUser = async (id, customer) => {
  let { email, password, shipping_address, billing_address } = customer;

  //hash PASS
  const updated_at = new Date();
  const values = [
    email,
    password,
    shipping_address,
    billing_address,
    updated_at,
    id
  ];

  const query =
    "UPDATE customer SET email = COALESCE($1,email), password = COALESCE($2,password), shipping_address = COALESCE($3,shipping_address), billing_address = COALESCE($4, billing_address), updated_at = ($5) WHERE customer_id = $6 RETURNING *";
  const { rows } = await pool.query(query, values);
  return rows[0];
};

////////////////////

//hacer login   //jwt
const verifyUser = async (email, password) => {
  const query = "SELECT * FROM customer WHERE email = $1";
  const { rows: [customer], rowCount } = await pool.query(query, [email]);

  //NotFound case (404)  -rowCount

  const { password: encryptedPass } = customer;
  const rightPass = bcrypt.compareSync(password, encryptedPass);

  if (!rightPass || !rowCount) {
    throw {
      code: 401,
      message: "Email o contraseña incorrectas",
    };
  }
  return customer
};

//obtener perfilde usuario  //jwt
const getUserData = async (email) => {
  //headers
  console.log(email)
  const query = "SELECT * FROM customer WHERE email = $1";
  const { rows: customer, rowCount } = await pool.query(query, [email]);
  if (!rowCount) {
    throw {
      code: 404,
      message: "Customer not found",
    };
  }
  return customer[0];
};


const authModel = {
  addUser,
  updateUser,
  verifyUser,
  getUserData,
};

export default authModel;

//db solution:

/* 

import { uuidv7 } from 'uuidv7';

const customerId = uuidv7(); // 018f6e3a-b5c2-7000-9a3d-5f2c1d4e8b0a

*/
