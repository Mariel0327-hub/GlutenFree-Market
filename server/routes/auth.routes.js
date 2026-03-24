import {Router} from 'express'
import authController from '../controllers/auth.controllers.js'
import { tokenVerification } from "../lib/middlewares/lib.middlewares.js";

const authRouter = Router()

authRouter.post('/register',  authController.registerUser )
authRouter.post('/login', authController.authenticateUser )
authRouter.get('/profile', tokenVerification, authController.getUserProfile )

export default authRouter
