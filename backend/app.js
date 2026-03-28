// Importamos express para crear la app
import express from "express";

// Importamos cors para permitir peticiones externas
import cors from "cors";

// Importamos dotenv para leer el archivo .env
import dotenv from "dotenv";

// Importamos la conexión a la base de datos
import { pool } from "./consultas.js";

// Importamos middlewares
import { logMiddleware, authMiddleware } from "./middlewares.js";

// Importamos todas las rutas agrupadas
import rutas from "./routes/index.js";

// Activamos dotenv
dotenv.config();

// Creamos la app de express
const app = express();

// =====================================
// MIDDLEWARES GLOBALES
// =====================================
app.use(cors());
app.use(express.json());
app.use(logMiddleware);

// =====================================
// RUTA BASE
// Sirve para probar que el backend está vivo
// =====================================
app.get("/", (req, res) => {
  res.json({ message: "Backend Gluten Free Market funcionando" });
});

// =====================================
// RUTA HEALTH
// Sirve para probar conexión con PostgreSQL
// =====================================
app.get("/api/health", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");

    res.json({
      ok: true,
      message: "Conexión a PostgreSQL exitosa",
      serverTime: result.rows[0].now,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error conectando con PostgreSQL",
      error: error.message,
    });
  }
});

// =====================================
// RUTA PROTEGIDA: PERFIL
// Solo entra quien mande token válido
// =====================================
app.get("/api/perfil", authMiddleware, async (req, res) => {
  try {
    res.json({
      ok: true,
      message: "Acceso autorizado",
      usuario: req.usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error obteniendo perfil",
      error: error.message,
    });
  }
});

// =====================================
// AQUÍ USAMOS LAS RUTAS SEPARADAS
// Todo quedará bajo /api
// =====================================
app.use("/api", rutas);

// Exportamos la app para usarla en index.js y tests
export default app;