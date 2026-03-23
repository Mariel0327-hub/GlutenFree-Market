import {Router} from 'express'
import orderController from '../controllers/order.controllers.js'

const orderRouter = Router()

orderRouter.get('/', orderController.readAllOrders )
orderRouter.get('/orders/:id', orderController.readOrdersbyId )
orderRouter.post('/orders', orderController.createNewOrder )
orderRouter.put('/orders/:id', orderController.updateNewOrder )
orderRouter.delete('/orders/:id', orderController.deleteNewOrder)

export default orderRouter




//contract ORDERS:


/*  
    GET /orders
    GET /orders/:id
    POST /orders
    PUT /orders:/id
    DELETE /cart/:id   !! no está en contrato



*/