import { pool as poolLocal } from "./db.js";
import { pool as poolNeon } from "./db_neon.js";

const DB_SWITCH = process.env.DB_SWITCH;


export const pool = DB_SWITCH === "neon" ? poolNeon : poolLocal;

export const getDbConnectionSwitch = async () => {
    const databaseOrigin = DB_SWITCH === 'neon' ? 'NEON' : 'LOCAL';

  try {
    const { rows } = await pool.query("SELECT NOW()");
    console.log(`Database selected: ${databaseOrigin} running; date: ${rows[0].now}`);
  } catch (error) {
    console.error(error);
    console.log(`Database ${databaseOrigin} failed` );

    /*
    Managing error with code from lib.errors
    */
  }
};
