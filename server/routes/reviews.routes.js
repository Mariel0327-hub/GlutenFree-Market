import { Router } from "express";
import reviewController from "../controllers/reviews.controllers.js";
import { tokenVerification } from "../lib/middlewares/lib.middlewares.js";

const reviewRouter = Router();

//ADMIN ONLY
reviewRouter.get("/", reviewController.readAllReviews);
reviewRouter.get("/:id", reviewController.readReviewsById);

//Para todo público
reviewRouter.get("/product/:id", reviewController.readReviewsByProduct);   //para ver reviews sobre un producto
reviewRouter.get("/customer/:id", reviewController.readReviewsByUser);  //ver reviews de usuarios (usuarios populares, influencers, etc...)

//User or ADMIN (token required for both)
reviewRouter.post("/", tokenVerification, reviewController.createNewReview);
reviewRouter.put("/:id", tokenVerification, reviewController.updateRegisteredReview);
reviewRouter.delete("/:id", tokenVerification, reviewController.deleteRegisteredReview);

export default reviewRouter;
