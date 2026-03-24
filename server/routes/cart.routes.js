import {Router} from 'express'
import cartController from '../controllers/cart.controllers.js'

const cartRouter = Router()

cartRouter.get('/', cartController.readAllCart )
cartRouter.get('/:id', cartController.readCartById )
cartRouter.post('/', cartController.createNewCart )
cartRouter.put('/:id', cartController.updateNewCart )
cartRouter.delete('/:id', cartController.deleteNewCart)

export default cartRouter


//contract CART:


/*  
    GET /cart
    GET /cart/:id
    POST /cart
    PUT /cart/:id
    DELETe /cart/:id



*/