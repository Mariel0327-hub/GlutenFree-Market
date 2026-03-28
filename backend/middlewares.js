// Importamos jsonwebtoken para verificar tokens
import jwt from "jsonwebtoken";

// Importamos la clave secreta desde secretKey.js
import { secretKey } from "./secretKey.js";

// Middleware simple para mostrar en consola qué ruta se está llamando
export const logMiddleware = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};

// Middleware para proteger rutas con JWT
export const authMiddleware = (req, res, next) => {
  try {
    // Leemos el header Authorization
    // Debe venir con formato: Bearer TU_TOKEN
    const authHeader = req.headers.authorization;

    // Si no viene el header, devolvemos error
    if (!authHeader) {
      return res.status(401).json({
        ok: false,
        message: "Token no enviado",
      });
    }

    // Separamos "Bearer" del token
    const token = authHeader.split(" ")[1];

    // Si no existe token, devolvemos error
    if (!token) {
      return res.status(401).json({
        ok: false,
        message: "Token inválido",
      });
    }

    // Verificamos el token con la clave secreta
    const decoded = jwt.verify(token, secretKey);

    // Guardamos los datos del usuario decodificados
    req.usuario = decoded;

    // Dejamos pasar a la ruta protegida
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      message: "Token inválido o expirado",
      error: error.message,
    });
  }
};