import {Router} from 'express'
import productController from '../controllers/product.controllers.js'

const productRouter = Router()

//Para tood público
productRouter.get('/', productController.readAllProducts )
productRouter.get('/:id', productController.readProductsById )
productRouter.get('/category/:id', productController.readProductsByUserId )   //implementar para ver productos por categoría

//ADMIN ONLY (BackOffice)
productRouter.post('/', productController.createNewProduct )
productRouter.put('/:id', productController.updateNewProduct)
productRouter.put('/restore/:id', productController.restoreOldProduct) //recuperar producto eliminad (soft delete)
productRouter.delete('/:id', productController.deleteNewProduct)  //usa soft delete (is_active = true -> is_active = false)

//!!!!GENERAR MIDDLEWARE DE AUTENTIFICACIÒN DE ADMIN (isAdminCheck())

export default productRouter
