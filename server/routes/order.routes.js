import {Router} from 'express'
import orderController from '../controllers/order.controllers.js'

const orderRouter = Router()

orderRouter.get('/', orderController.readAllOrders )
orderRouter.get('/:id', orderController.readOrdersbyId )
orderRouter.post('/', orderController.createNewOrder )
orderRouter.put('/:id', orderController.updateNewOrder )
orderRouter.delete('/:id', orderController.deleteNewOrder)

export default orderRouter




//contract ORDERS:


/*  
    GET /orders
    GET /orders/:id
    POST /orders
    PUT /orders:/id
    DELETE /cart/:id   !! no está en contrato



*/