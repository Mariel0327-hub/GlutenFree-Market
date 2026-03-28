import {Router} from 'express'
import productController from '../controllers/product.controllers.js'
import { adminVerification, tokenVerification } from '../lib/middlewares/lib.middlewares.js'

const ADMIN_ROLE = process.env.ADMIN_ROLE

const productRouter = Router()

//Para tood público
productRouter.get('/category/:id', productController.readProductsByCategory )   //implementar para ver productos por categoría
productRouter.get('/:id', productController.readProductsById )
productRouter.get('/',tokenVerification, productController.readAllProducts )

//ADMIN ONLY (BackOffice)
productRouter.post('/', tokenVerification, adminVerification,  productController.createNewProduct )
productRouter.put('/:id', tokenVerification, adminVerification,  productController.updateNewProduct)
productRouter.put('/restore/:id', tokenVerification, adminVerification, productController.restoreOldProduct) //recuperar producto eliminad (soft delete)
productRouter.delete('/:id', tokenVerification, adminVerification,  productController.deleteNewProduct)  //usa soft delete (is_active = true -> is_active = false)

//!!!!GENERAR MIDDLEWARE DE AUTENTIFICACIÒN DE ADMIN (isAdminCheck())

export default productRouter
