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
export const updateUser = async (id, customerData) => {
  let {
    name,
    password,
    email,
    shipping_address,
    billing_address,
    profile_image,
  } = customerData;

  const encryptedPass = password ? bcrypt.hashSync(password, 10) : null;

  const updated_at = new Date();
  const values = [
    name || null,
    email || null,
    encryptedPass,
    shipping_address || null,
    billing_address || null,
    profile_image || null,
    updated_at,
    id,
  ];

  const query = `
    UPDATE customer 
    SET name = COALESCE($1, name), 
        email = COALESCE($2, email), 
        password = COALESCE($3, password), 
        shipping_address = COALESCE($4, shipping_address),
        billing_address = COALESCE($5, billing_address),
        profile_image = COALESCE($6, profile_image),
        updated_at = $7
    WHERE customer_id = $8 
    RETURNING *`;

  const { rows } = await pool.query(query, values);
  return rows[0];
};
////////////////////

//hacer login   //jwt
const verifyUser = async (email, password) => {
  const query = "SELECT * FROM customer WHERE email = $1";
  const {
    rows: [customer],
    rowCount,
  } = await pool.query(query, [email]);

  //NotFound case (404)  -rowCount
  //con esto verificamos primero si el usuario EXISTE
  if (!rowCount) {
    throw {
      code: 401,
      message: "Email o contraseña incorrectas",
    };
  }
  const { password: encryptedPass } = customer;
  const rightPass = bcrypt.compareSync(password, encryptedPass);

  if (!rightPass) {
    throw {
      code: 401,
      message: "Email o contraseña incorrectas",
    };
  }
  return customer;
};

//obtener perfilde usuario  //jwt
const getUserData = async (email) => {
  //headers
  console.log(email);
  const query = "SELECT * FROM customer WHERE email = $1";
  const { rows: customer, rowCount } = await pool.query(query, [email]);
  if (!rowCount) {
    throw {
      code: 404,
      message: "Customer not found",
    };
  }
  return customer;
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
