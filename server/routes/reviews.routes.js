import {Router} from 'express'
import reviewController from '../controllers/reviews.controllers.js'

const reviewRouter = Router()

reviewRouter.get('/', reviewController.readAllReviews )
reviewRouter.get('/customer/:id', reviewController.readReviewsByUser )
reviewRouter.get('/product/:id', reviewController.readReviewsByProduct )
reviewRouter.get('/:id', reviewController.readReviewsById )
reviewRouter.post('/', reviewController.createNewReview)
reviewRouter.put('/:id', reviewController.updateRegisteredReview)
reviewRouter.delete('/:id', reviewController.deleteRegisteredReview)


export default reviewRouter


//contract ORDERS:


/*  
    GET /reviews
    GET /customer/:id/reviews  --revisar orden y si aplica aquí
    GET /product/:id/reviews --revisar orden y si aplica aquí
    POST /reviews
    PUT /reviws/:id
    DELETE /reviews/:id  



*/