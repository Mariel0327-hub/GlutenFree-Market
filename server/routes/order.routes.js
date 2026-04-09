import { Router } from "express";
import orderController from "../controllers/order.controllers.js";
import {
  adminVerification,
  tokenVerification,
} from "../lib/middlewares/lib.middlewares.js";

const ADMIN_ROLE = process.env.ADMIN_ROLE;

const orderRouter = Router();
//ORDENES DE COMPRA

//PUBLICOS (CLIENTE + token)
// Detalle de orden resitringidos a cliente, posibilidad de ver orden del histórico.
orderRouter.get(
  "/customer/:order_id/items",
  tokenVerification,
  orderController.readOrderDetailsbyCustomer,
);

//ADMIN
//ordenes filtradas por id orden (posteriormente se pueden agregar filtros ordenar clientes, precios, etc...)
orderRouter.get(
  "/:id/items/",
  tokenVerification, adminVerification(ADMIN_ROLE),
  orderController.readOrderDetailsbyId,
);

//CLIENTE
//Histórico de ordenes restringidas al ciente
orderRouter.get(
  "/customer",
  tokenVerification,
  orderController.readOrdersbyCustomer,
);

//ADMIN ONLY
//Detalle de todas las ordenes (ADMIN) (aplicar filtro para ver por cliente o por order)
orderRouter.get("/items", orderController.readAllOrderDetails);
//todas las ordenes (sin detalle) (ADMIN)
orderRouter.get(
  "/",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  orderController.readAllOrders,
);
//Orden por id específico (sin detalle) (ADMIN)
orderRouter.get(
  "/:id",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  orderController.readOrdersbyId,
);

//Cliente y/o ADMIN (token required)
//crear orden de compra (al hacer checkout)
orderRouter.post("/", tokenVerification, orderController.createNewOrder);

//ADMIN ONLY

//modifica orden de compra (cambiar estado de pago, shipping) (ADMIN)
orderRouter.put(
  "/:id",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  orderController.updateNewOrder,
);

//Se elimina una orden de compra
orderRouter.delete(
  "/:id",
  tokenVerification,
  adminVerification(ADMIN_ROLE),
  adminVerification(ADMIN_ROLE),
  orderController.deleteNewOrder,
);

export default orderRouter;
