import { Router } from "express";
import categoryController from "../controllers/categories.controllers.js";
import {
  adminVerification,
  tokenVerification,
} from "../lib/middlewares/lib.middlewares.js";

const ADMIN_ROLE = process.env.ADMIN_ROLE;

const categoryRouter = Router();


///CATEGORIAS
//Mostrar categorías existentes:
categoryRouter.get("/", categoryController.readAllCategories); //implementar para ver productos por categoría
categoryRouter.get("/:id", categoryController.readCategoriesById); //implementar para ver productos por categoría
categoryRouter.post("/", tokenVerification, adminVerification(ADMIN_ROLE), categoryController.createNewCategory); //implementar para ver productos por categoría
categoryRouter.put("/:id", tokenVerification, adminVerification(ADMIN_ROLE), categoryController.updateNewCategory); //implementar para ver productos por categoría
categoryRouter.delete("/:id", categoryController.deleteNewCategory); //implementar para ver productos por categoría

export default categoryRouter;
