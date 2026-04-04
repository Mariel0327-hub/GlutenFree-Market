import { Router } from "express";
import productController from "../controllers/product.controllers.js";
import {
  adminVerification,
  tokenVerification,
} from "../lib/middlewares/lib.middlewares.js";

const ADMIN_ROLE = process.env.ADMIN_ROLE;

const productRouter = Router();




//PRODUCTOS
//Para todo público

//Ruta para filtrar todos los productos por precio, categoría, relevancia**, stock, etc...
productRouter.get("/filter", productController.readAllProductsFiltered);
//Ruta específica para redirigir a categorías y ver sus productos.
productRouter.get("/category/:id", productController.readProductsByCategory); 


//ADMIN ONLY (BackOffice)
productRouter.post(
  "/",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  productController.createNewProduct,
);
productRouter.put(
  "/restore/:id",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  productController.restoreOldProduct,
); //recuperar producto eliminad (soft delete)
productRouter.put(
  "/:id",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  productController.updateNewProduct,
);
productRouter.delete(
  "/:id",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  productController.deleteNewProduct,
); //usa soft delete (is_active = true -> is_active = false)


// Rutas generales para revisar productos (inventario) público?
productRouter.get("/:id", productController.readProductsById);
productRouter.get("/", productController.readAllProducts);


export default productRouter;
