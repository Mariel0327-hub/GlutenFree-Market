// Importamos express para crear rutas separadas
import express from "express";

// Importamos la conexión a la base de datos
import { pool } from "../consultas.js";

// Creamos el router de express
const router = express.Router();

// =====================================
// RUTA: OBTENER TODOS LOS PRODUCTOS
// =====================================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM productos");

    res.json({
      ok: true,
      productos: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error obteniendo productos",
      error: error.message,
    });
  }
});

// Exportamos este router
export default router;