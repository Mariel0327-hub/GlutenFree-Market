import {Router} from 'express'
import customerController from '../controllers/customer.controllers.js'
import { tokenVerification } from "../lib/middlewares/lib.middlewares.js";

///CAMBIAR METODOS PARA CUSTOMER

const customerRouter = Router()
//FAVORITES
//Client  + ADMIN (token required)
customerRouter.get('/favorites', customerController.readAllFavorites)
customerRouter.get('/favorites/:id', customerController.readFavoritesbyId )
customerRouter.post('/favorites', customerController.createNewFavorite )
customerRouter.put('/favorites/:id', customerController.updateNewFavorite )
customerRouter.delete('/favorites/:id', customerController.deleteNewFavorite)

//CLIENTES
//ADMIN ONLY
customerRouter.get('/', customerController.readAllCustomers )
customerRouter.get('/:id', customerController.readCustomersbyId )
customerRouter.delete('/:id', customerController.deleteNewCustomer )



export default customerRouter
