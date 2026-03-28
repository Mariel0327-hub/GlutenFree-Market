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

// crear, modificar, eliminar productos del carrito persistente
cartRouter.post('/product', tokenVerification, cartController.createNewCartProduct )
cartRouter.put('/product', tokenVerification, cartController.updateExistingCartProduct )
cartRouter.delete('/product', tokenVerification, cartController.deleteExistingCartProduct )

//Funciones Genéricas / ADMIN
// ver todos los carritos
cartRouter.get('/', tokenVerification, adminVerification, cartController.readAllCart )
cartRouter.get('/:id', tokenVerification, adminVerification, cartController.readCartById )

//crear un carrito cliente, admin? cuando se crea en específico?
cartRouter.post('/', tokenVerification, cartController.createNewCartInstance )
//eliminar un carrito antes de la orden compra, AMDMIN;
cartRouter.delete('/:id', tokenVerification, adminVerification, cartController.deleteNewCart)

export default cartRouter
