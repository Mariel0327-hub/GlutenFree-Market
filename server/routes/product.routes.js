import { Router } from "express";
import productController from "../controllers/product.controllers.js";
import {
  adminVerification,
  tokenVerification,
} from "../lib/middlewares/lib.middlewares.js";

const ADMIN_ROLE = process.env.ADMIN_ROLE;

const productRouter = Router();


//CATEGORIAS
//Mostrar categorías existentes:
productRouter.get("/categories", productController.readAllCategories); //implementar para ver productos por categoría
productRouter.get("/categories/:id", productController.readCategoriesById); //implementar para ver productos por categoría
productRouter.post("/categories", tokenVerification, adminVerification(ADMIN_ROLE), productController.createNewCategory); //implementar para ver productos por categoría
productRouter.put("/categories/:id", tokenVerification, adminVerification(ADMIN_ROLE), productController.updateNewCategory); //implementar para ver productos por categoría
productRouter.delete("/categories/:id", productController.deleteNewCategory); //implementar para ver productos por categoría



//PRODUCTOS
//Para todo público
//Ruta específica para redirigir a categorías y ver sus productos.
productRouter.get("/category/:id", productController.readProductsByCategory); 
//Ruta para filtrar todos los productos por precio, categoría, relevancia**, stock, etc...
productRouter.get("/filter", productController.readAllProductsFiltered);

// Rutas generales para revisar productos (inventario) público?
productRouter.get("/:id", productController.readProductsById);
productRouter.get("/", productController.readAllProducts);

//ADMIN ONLY (BackOffice)
productRouter.post(
  "/",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  productController.createNewProduct,
);
productRouter.put(
  "/:id",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  productController.updateNewProduct,
);
productRouter.put(
  "/restore/:id",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  productController.restoreOldProduct,
); //recuperar producto eliminad (soft delete)
productRouter.delete(
  "/:id",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  productController.deleteNewProduct,
); //usa soft delete (is_active = true -> is_active = false)


export default productRouter;
