import {Router} from 'express'
import authController from '../controllers/auth.controllers.js'
import { adminVerification, tokenVerification } from "../lib/middlewares/lib.middlewares.js";
import { authenticateAdmin } from '../controllers/admin.auth.controller.js';



const authRouter = Router()

authRouter.post('/register',  authController.registerUser )
authRouter.post('/login', authController.authenticateUser )
authRouter.post('/admin', authenticateAdmin )
authRouter.get('/profile', tokenVerification, authController.getUserProfile )


export default authRouter
