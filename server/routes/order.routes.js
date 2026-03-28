import {Router} from 'express'
import orderController from '../controllers/order.controllers.js'
import { adminVerification, tokenVerification } from "../lib/middlewares/lib.middlewares.js";


const orderRouter = Router()
//DETALLES DE ORDEN
//PUBLICOS (CLIENTE + token)
//por orden
orderRouter.get('/items/:id', tokenVerification, orderController.readOrderDetailsbyId )
//por cliente
orderRouter.get('/customer/:id',tokenVerification, orderController.readOrdersbyCustomer)


//ADMIN ONLY
//todos
orderRouter.get('/items', orderController.readAllOrderDetails )
orderRouter.get('/', orderController.readAllOrders )
orderRouter.get('/:id', orderController.readOrdersbyId )


//BOTH Cliente y ADMIN (token required)
//crear orden de compra
orderRouter.post('/', tokenVerification, orderController.createNewOrder )
//modifica orden de compra (cambiar estado de pago, shipping)
orderRouter.put('/:id', tokenVerification, orderController.updateNewOrder )  //pasar a patch e implementar

//ADMIN ONLY
orderRouter.delete('/:id', tokenVerification, adminVerification, orderController.deleteNewOrder)

export default orderRouter
