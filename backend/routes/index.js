// Importamos express para usar Router
import express from "express";

// Creamos el router principal
const router = express.Router();

// Importamos cada grupo de rutas
import productosRoutes from "./productos.routes.js";
import categoriasRoutes from "./categorias.routes.js";
import usuariosRoutes from "./usuarios.routes.js";
import authRoutes from "./auth.routes.js";

// Conectamos cada ruta con su endpoint

// /api/productos
router.use("/productos", productosRoutes);

// /api/categorias
router.use("/categorias", categoriasRoutes);

// /api/usuarios
router.use("/usuarios", usuariosRoutes);

// /api/auth
router.use("/auth", authRoutes);

// Exportamos el router
export default router;