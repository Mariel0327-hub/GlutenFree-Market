import {Router} from 'express'
import orderController from '../controllers/order.controllers.js'
import { tokenVerification } from "../lib/middlewares/lib.middlewares.js";


const orderRouter = Router()
//Detalles de orden
orderRouter.get('/items', orderController.readAllOrderDetails )
orderRouter.get('/items/:id', orderController.readOrderDetailsbyId )

orderRouter.get('/customer/:id',tokenVerification, orderController.readOrdersbyCustomer)


//ADMIN ONLY
orderRouter.get('/', orderController.readAllOrders )
orderRouter.get('/:id', orderController.readOrdersbyId )


//BOTH Cliente y ADMIN (token required)
orderRouter.post('/', tokenVerification, orderController.createNewOrder )
orderRouter.put('/:id', orderController.updateNewOrder )  //pasar a patch e implementar

//ADMIN ONLY
orderRouter.delete('/:id', orderController.deleteNewOrder)

export default orderRouter
