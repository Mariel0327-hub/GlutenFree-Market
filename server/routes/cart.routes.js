import {Router} from 'express'
import cartController from '../controllers/cart.controllers.js'

const cartRouter = Router()

cartRouter.get('/', cartController.readAllCart )
cartRouter.get('/cart/:id', cartController.readCartById )
cartRouter.post('/cart', cartController.createNewCart )
cartRouter.put('/cart/:id', cartController.updateNewCart )
cartRouter.delete('/cart/:id', cartController.deleteNewCart)

export default cartRouter


//contract CART:


/*  
    GET /cart
    GET /cart/:id
    POST /cart
    PUT /cart/:id
    DELETe /cart/:id



*/