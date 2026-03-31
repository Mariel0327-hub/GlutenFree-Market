import bcrypt from "bcryptjs";
import { pool } from "../db/db.js";
import { uuidv7 } from "uuidv7";

//registrar usuario nuevo
//agregar nombre (servidor http y BD)
const addUser = async (customer) => {
  let { email, shipping_address, billing_address, password } = customer;
  password = password.toString();

  //generación de ID
  const custIdBody = uuidv7();
  //hash PASS
  const encryptedPass = bcrypt.hashSync(password);

  // creación de [values]
  const customer_id = `cust-${custIdBody}`;
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
//agregar nombre
const updateUser = async (id, customer) => {
  let { email, password, shipping_address, billing_address } = customer;

  const encryptedPass = bcrypt.hashSync(password);

  //hash PASS
  const updated_at = new Date();
  const values = [
    /*  //name || null, */
    email,
    encryptedPass,
    shipping_address || "",
    billing_address || "",
    updated_at,
    id,
  ];
  //agregar name = COALESCE($1, name)
  const query =
    "UPDATE customer SET email = COALESCE($1,email), password = COALESCE($2,password), shipping_address = COALESCE($3,shipping_address), billing_address = COALESCE($4, billing_address), updated_at = ($5) WHERE customer_id = $6 RETURNING *";
  const { rows } = await pool.query(query, values);
  return rows[0];
};

////////////////////

//hacer login   //jwt
// podría ser con customer_id (a implementar)
const verifyUser = async (email, password) => {
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

  const { password: encryptedPass } = customer;
  const rightPass = bcrypt.compareSync(password, encryptedPass);

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
  console.log(customer.id);
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
