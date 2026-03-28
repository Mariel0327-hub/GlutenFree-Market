// Exportamos la clave secreta del archivo .env
// Esta clave sirve para firmar y validar tokens JWT
import dotenv from "dotenv";

dotenv.config();

export const secretKey = process.env.JWT_SECRET;