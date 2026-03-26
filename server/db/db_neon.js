import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

//CONEXIÓN BASE DE DATOS - NEON

export const pool = new Pool({
  connectionString: process.env.CONNECTION_STRING,
  allowExitOnIdle: true,
});

export const getDbConnectionNeon = async () => {
  try {
    const { rows } = await pool.query("SELECT NOW()");
    console.log(`Database NEON running; date: ${rows[0].now}`);
  } catch (error) {
    console.error(error);
    console.log("error");

  }
};
