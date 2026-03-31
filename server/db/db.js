import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

//CONEXIÓN BASE DE DATOS - LOCAL

export const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

export const getDbConnection = async () => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    console.log(`Database running; date: ${rows[0].now}`);
  } catch (error) {
    console.error(error);
    console.log("error");

    /*
    Managing error with code from lib.errors
    */
  }
};
