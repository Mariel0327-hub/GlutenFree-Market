import {Router} from 'express'
import productController from '../controllers/product.controllers.js'

const productRouter = Router()

productRouter.get('/', productController.readAllProducts )
productRouter.get('/:id', productController.readProductsById )
productRouter.get('/user/:id', productController.readProductsByUserId )   ////////////revisar esta ruta, como implementar
productRouter.post('/', productController.createNewProduct )
productRouter.put('/:id', productController.updateNewProduct)
productRouter.delete('/:id', productController.deleteNewProduct)

export default productRouter

//contract ROUTES:


/*  
    GET /products //////////LISTO
    GET /products/:id //////////LISTO
    POST /products //////////////LISTO (revisar columnas.... some are hardcoded)
    PUT /products/:id //////////////LISTO (revisar columnas.... some are hardcoded)
    DELETe /products/:id  ///////////LISTO (Soft Delete)



*/

//CATEGORIES
/*  

GET/ categories

*/