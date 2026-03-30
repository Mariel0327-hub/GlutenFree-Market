import { Router } from "express";
import authController from "../controllers/auth.controllers.js";
import {
  adminVerification,
  tokenVerification,
} from "../lib/middlewares/lib.middlewares.js";
import { authenticateAdmin } from "../controllers/admin.auth.controller.js";

const ADMIN_ROLE = process.env.ADMIN_ROLE;

const authRouter = Router();

//CUSTOMER
authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.authenticateUser);
authRouter.put("/alter_profile/:id", authController.modifyUser); //mdificar datos de usuario
authRouter.get("/profile", tokenVerification, authController.getUserProfile);
authRouter.delete("/profile", tokenVerification, authController.deleteNewUser); //usuarios pueden borrar su perfil si lo desean

//ADMIN
authRouter.post("/admin", authenticateAdmin);
authRouter.get("/customers", adminVerification); //para ver a todos los clientes

export default authRouter;
