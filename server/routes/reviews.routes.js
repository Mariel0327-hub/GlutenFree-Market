import { Router } from "express";
import reviewController from "../controllers/reviews.controllers.js";
import { adminVerification, tokenVerification } from "../lib/middlewares/lib.middlewares.js";

const reviewRouter = Router();

//Para todo público
reviewRouter.get("/product/:id", reviewController.readReviewsByProduct);   //para ver reviews sobre un producto
reviewRouter.get("/customer/:id", reviewController.readReviewsByUser);  //ver reviews de usuarios (usuarios populares, influencers, etc...)
reviewRouter.get("/", reviewController.readAllReviews);  // -> filtrar por producto, relevancia, fecha?
reviewRouter.get("/:id", reviewController.readReviewsById);


//User or ADMIN (token required for both)
reviewRouter.post("/", tokenVerification, reviewController.createNewReview);
reviewRouter.put("/:id", tokenVerification, reviewController.updateRegisteredReview);
reviewRouter.delete("/:id", tokenVerification, reviewController.deleteRegisteredReview);

export default reviewRouter;
