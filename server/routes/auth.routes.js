import {Router} from 'express'
import authController from '../controllers/auth.controllers.js'

const authRouter = Router()

authRouter.post('/register', authController.registerUser )
authRouter.post('/login', authController.authenticateUser )
authRouter.get('/profile', authController.getUserProfile )

export default authRouter


//contract ROUTES:


/*  

    POST/register 
    POST/login
    GET/profile



*/