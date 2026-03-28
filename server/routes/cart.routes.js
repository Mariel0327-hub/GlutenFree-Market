import {Router} from 'express'
import cartController from '../controllers/cart.controllers.js'
import { adminVerification, tokenVerification } from "../lib/middlewares/lib.middlewares.js";


const cartRouter = Router()
//Detalles de orden de todos los clientes (ADMIN)
cartRouter.get('/items', cartController.readAllCartDetails )
//ver los items de un carrito especifico
cartRouter.get('/items/:id', cartController.readCartsDetailsbyId )
//obtener los items del carritod de un usuario
cartRouter.get('/customer/:id',tokenVerification, cartController.readCartByCustomer )



//Client  + ADMIN (token required)
//cartRouter.post('/', tokenVerification, cartController.createNewCart )
//cartRouter.put('/:id', tokenVerification, cartController.updateNewCart )

cartRouter.post('/product', tokenVerification, cartController.createNewCartProduct )
cartRouter.put('/product', tokenVerification, cartController.updateExistingCartProduct )
cartRouter.delete('/product', tokenVerification, cartController.deleteExistingCartProduct )


cartRouter.get('/', tokenVerification, cartController.readAllCart )
cartRouter.get('/:id', tokenVerification, cartController.readCartById )
cartRouter.post('/', tokenVerification, cartController.createNewCartInstance )

cartRouter.delete('/:id', tokenVerification, adminVerification, cartController.deleteNewCart)

export default cartRouter
