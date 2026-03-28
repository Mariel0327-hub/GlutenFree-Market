// Importamos express para crear rutas separadas
import express from "express";

// Importamos la conexión a la base de datos
import { pool } from "../consultas.js";

// Creamos el router de express
const router = express.Router();

// =====================================
// RUTA: OBTENER TODAS LAS CATEGORÍAS
// =====================================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM categorias ORDER BY id ASC"
    );

    res.json({
      ok: true,
      categorias: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error obteniendo categorías",
      error: error.message,
    });
  }
});

// Exportamos este router
export default router;