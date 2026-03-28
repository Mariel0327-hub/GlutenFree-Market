import { Router } from "express";
import authController from "../controllers/auth.controllers.js";
import { adminVerification, tokenVerification } from "../lib/middlewares/lib.middlewares.js";
import { authenticateAdmin } from "../controllers/admin.auth.controller.js";

const authRouter = Router();

//CUSTOMER
authRouter.post("/register", authController.registerUser);
authRouter.post("/login", authController.authenticateUser);
authRouter.get("/profile", tokenVerification, authController.getUserProfile);
authRouter.put("/alter_profile/:id", tokenVerification, authController.modifyUser);

//ADMIN
authRouter.post("/admin", authenticateAdmin);
authRouter.get('/customers', adminVerification, )//para ver a todos los clientes

export default authRouter;
