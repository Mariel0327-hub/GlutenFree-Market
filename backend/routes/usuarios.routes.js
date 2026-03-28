// Importamos express para crear rutas separadas
import express from "express";

// Importamos la conexión a la base de datos
import { pool } from "../consultas.js";

// Creamos el router de express
const router = express.Router();

// =====================================
// RUTA: OBTENER TODOS LOS USUARIOS
// =====================================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, nombre, email, created_at FROM usuarios ORDER BY id ASC"
    );

    res.json({
      ok: true,
      usuarios: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error obteniendo usuarios",
      error: error.message,
    });
  }
});

// =====================================
// RUTA: REGISTRAR USUARIO
// =====================================
router.post("/", async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const result = await pool.query(
      "INSERT INTO usuarios (nombre, email, password) VALUES ($1, $2, $3) RETURNING id, nombre, email, created_at",
      [nombre, email, password]
    );

    res.json({
      ok: true,
      usuario: result.rows[0],
    });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        ok: false,
        message: "El email ya está registrado",
      });
    }

    res.status(500).json({
      ok: false,
      message: "Error creando usuario",
      error: error.message,
    });
  }
});

// Exportamos este router
export default router;