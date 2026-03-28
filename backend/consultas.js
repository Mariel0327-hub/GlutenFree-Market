// Importamos la librería pg para conectarnos a PostgreSQL
import pg from "pg";

// Importamos dotenv para leer variables desde el archivo .env
import dotenv from "dotenv";

// Activamos dotenv para poder usar process.env
dotenv.config();

// Sacamos Pool desde pg
// Pool sirve para crear y administrar conexiones a la base de datos
const { Pool } = pg;

// Creamos el pool de conexión usando la URL completa de Neon
export const pool = new Pool({
  // Usa la variable DATABASE_URL del archivo .env
  connectionString: process.env.DATABASE_URL,

  // Neon requiere SSL para conectarse de forma segura
  ssl: {
    rejectUnauthorized: false,
  },
});

// Mensaje cuando la conexión se logra correctamente
pool.on("connect", () => {
  console.log("✅ Conectado a Neon PostgreSQL");
});

// Mensaje cuando ocurre un error de conexión
pool.on("error", (error) => {
  console.error("❌ Error en PostgreSQL:", error.message);
});