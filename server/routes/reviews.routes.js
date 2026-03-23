import {Router} from 'express'
import reviewController from '../controllers/reviews.controllers.js'

const reviewRouter = Router()

reviewRouter.get('/', reviewController.readAllReviews )
reviewRouter.get('/reviews/users/:id', reviewController.readReviewsByUser )
reviewRouter.get('/reviews/product/:id', reviewController.readReviewsByProduct )
reviewRouter.get('/reviews/:id', reviewController.readReviewsById )
reviewRouter.post('/reviews', reviewController.createNewReview)
reviewRouter.put('/reviews/:id', reviewController.updateRegisteredReview)
reviewRouter.delete('/reviews/:id', reviewController.deleteRegisteredReview)


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