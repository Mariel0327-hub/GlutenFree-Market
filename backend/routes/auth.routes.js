// Importamos express para crear rutas separadas
import express from "express";

// Importamos la conexión a la base de datos
import { pool } from "../consultas.js";

// Importamos JWT para crear tokens
import jwt from "jsonwebtoken";

// Importamos la clave secreta para firmar tokens
import { secretKey } from "../secretKey.js";

// Creamos el router de express
const router = express.Router();

// =====================================
// RUTA: LOGIN
// =====================================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Debes enviar email y password",
      });
    }

    const result = await pool.query(
      "SELECT id, nombre, email, created_at FROM usuarios WHERE email = $1 AND password = $2 LIMIT 1",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales incorrectas",
      });
    }

    const usuario = result.rows[0];

    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
      },
      secretKey,
      {
        expiresIn: "1h",
      }
    );

    res.json({
      ok: true,
      message: "Login exitoso",
      token,
      usuario,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error en login",
      error: error.message,
    });
  }
});

// Exportamos este router
export default router;