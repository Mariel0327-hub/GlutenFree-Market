import {Router} from 'express'
import cartController from '../controllers/cart.controllers.js'
import { tokenVerification } from "../lib/middlewares/lib.middlewares.js";


const cartRouter = Router()
//ADMIN ONLY
cartRouter.get('/', cartController.readAllCart )
cartRouter.get('/:id', cartController.readCartById )

//Client  + ADMIN (token required)
cartRouter.get('/customer/:id',tokenVerification, cartController.readCartByCustomer )
cartRouter.post('/', tokenVerification, cartController.createNewCart )
cartRouter.patch('/:id', tokenVerification, cartController.updateNewCart )

// ADMIN ONLY?
cartRouter.delete('/:id', cartController.deleteNewCart)

export default cartRouter
