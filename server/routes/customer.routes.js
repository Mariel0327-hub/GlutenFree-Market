import {Router} from 'express'
import customerController from '../controllers/customer.controllers.js'
import { adminVerification, tokenVerification } from "../lib/middlewares/lib.middlewares.js";

const ADMIN_ROLE = process.env.ADMIN_ROLE

const customerRouter = Router()
//FAVORITES

//Cliente (a implementar proximamente) -> para que el cliente vea sus favoritos
customerRouter.get('/:id/favorites',tokenVerification, adminVerification(ADMIN_ROLE), customerController.readAllFavorites)

//ADMIN ONLY
customerRouter.get('/favorites',tokenVerification, adminVerification(ADMIN_ROLE), customerController.readAllFavorites)
customerRouter.get('/favorites/:id',tokenVerification, adminVerification(ADMIN_ROLE), customerController.readFavoritesbyId )

//Cliente or ADMIN
customerRouter.post('/favorites',tokenVerification, customerController.createNewFavorite )
customerRouter.put('/favorites/:id',tokenVerification, customerController.updateNewFavorite )
customerRouter.delete('/favorites/:id',tokenVerification, customerController.deleteNewFavorite)


//ADMIN ONLY
customerRouter.get('/', tokenVerification, adminVerification(ADMIN_ROLE), customerController.readAllCustomers )
customerRouter.get('/:id', tokenVerification, adminVerification, customerController.readCustomersbyId )

//ADMIN elimina cliente
customerRouter.delete('/:id', tokenVerification, adminVerification, customerController.deleteNewCustomer )



export default customerRouter
