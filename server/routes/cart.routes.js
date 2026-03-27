import {Router} from 'express'
import cartController from '../controllers/cart.controllers.js'
import { adminVerification, tokenVerification } from "../lib/middlewares/lib.middlewares.js";


const cartRouter = Router()
//Detalles de orden
cartRouter.get('/items', cartController.readAllCartDetails )
cartRouter.get('/items/:id', cartController.readCartsDetailsbyId )
cartRouter.get('/customer/:id',tokenVerification, cartController.readCartByCustomer )


//ADMIN ONLY
cartRouter.get('/', tokenVerification, cartController.readAllCart )
cartRouter.get('/:id', tokenVerification, cartController.readCartById )

//Client  + ADMIN (token required)
cartRouter.post('/', tokenVerification, cartController.createNewCart )
cartRouter.patch('/:id', tokenVerification, cartController.updateNewCart )

// ADMIN ONLY?
cartRouter.delete('/:id', tokenVerification, adminVerification, cartController.deleteNewCart)

export default cartRouter
