import {Router} from 'express'
import customerController from '../controllers/cart.controllers.js'
import { tokenVerification } from "../lib/middlewares/lib.middlewares.js";

///CAMBIAR METODOS PARA CUSTOMER

const customerRouter = Router()
//ADMIN ONLY
customerRouter.get('/', customerController.readAllCart )
customerRouter.get('/:id', customerController.readCartById )

//Client  + ADMIN (token required)
customerRouter.get('/favorites',tokenVerification, customerController.readCartByCustomer)
customerRouter.get('/favorites/:id',tokenVerification, customerController.readCartByCustomer )
customerRouter.post('/favorites', tokenVerification, customerController.createNewCart )
customerRouter.put('/favorites/:id', tokenVerification, customerController.updateNewCart )
customerRouter.delete('/favorites:id', customerController.deleteNewCart)

// ADMIN ONLY
customerRouter.delete('/:id', customerController.deleteNewCart)

export default customerRouter
