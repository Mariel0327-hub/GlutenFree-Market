import {Router} from 'express'
import customerController from '../controllers/customer.controllers.js'
import { adminVerification, tokenVerification } from "../lib/middlewares/lib.middlewares.js";

const ADMIN_ROLE = process.env.ADMIN_ROLE

const customerRouter = Router()
//FAVORITES
//Client  + ADMIN (token required)
customerRouter.get('/favorites',tokenVerification, customerController.readAllFavorites)
customerRouter.get('/favorites/:id',tokenVerification, customerController.readFavoritesbyId )
customerRouter.post('/favorites',tokenVerification, customerController.createNewFavorite )
customerRouter.put('/favorites/:id',tokenVerification, customerController.updateNewFavorite )
customerRouter.delete('/favorites/:id',tokenVerification, customerController.deleteNewFavorite)

//CLIENTES
//ADMIN ONLY
customerRouter.get('/', tokenVerification, adminVerification(ADMIN_ROLE), customerController.readAllCustomers )
customerRouter.get('/:id', tokenVerification, adminVerification, customerController.readCustomersbyId )
//already exists in auth routes 
//customerRouter.delete('/:id', tokenVerification, adminVerification, customerController.deleteNewCustomer )



export default customerRouter
