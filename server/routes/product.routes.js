import {Router} from 'express'
import productController from '../controllers/product.controllers.js'
import { adminVerification, tokenVerification } from '../lib/middlewares/lib.middlewares.js'

const ADMIN_ROLE = process.env.ADMIN_ROLE

const productRouter = Router()

//Para tood público
//Ruta específica para redirigir a categorías
productRouter.get('/category/:id', productController.readProductsByCategory )   //implementar para ver productos por categoría
//Ruta para filtrar todos los productos por precio, categoría, relevancia**, stock, etc...
productRouter.get('/filter', productController.readAllProductsFiltered )
// Rutas generales para revisar productos (inventario) público
productRouter.get('/:id', productController.readProductsById )
productRouter.get('/', productController.readAllProducts )



//ADMIN ONLY (BackOffice)
productRouter.post('/', tokenVerification, adminVerification,  productController.createNewProduct )
productRouter.put('/:id', tokenVerification, adminVerification,  productController.updateNewProduct)
productRouter.put('/restore/:id', tokenVerification, adminVerification, productController.restoreOldProduct) //recuperar producto eliminad (soft delete)
productRouter.delete('/:id', tokenVerification, adminVerification,  productController.deleteNewProduct)  //usa soft delete (is_active = true -> is_active = false)

//!!!!GENERAR MIDDLEWARE DE AUTENTIFICACIÒN DE ADMIN (isAdminCheck())

export default productRouter
