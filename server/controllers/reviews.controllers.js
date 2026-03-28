import reviewModel from "../models/reviews.models.js";
import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";

const readAllReviews = async (req, res) => {
  try {
    const result = await reviewModel.findAllReviews();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readReviewsByUser = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await reviewModel.findReviewsByUSer(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readReviewsByProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await reviewModel.findReviewsByProduct(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// for inner purposes
const readReviewsById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await reviewModel.findReviewsById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewReview = async (req, res) => {
  const { email } = req.user;
  const { about_product, id_product, review_body, rating } = req.body;
  try {
    const result = await reviewModel.createReview(
      email,
      about_product,
      id_product,
      review_body,
      rating,
    );
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateRegisteredReview = async (req, res) => {
  const { id } = req.params;
  const { about_product, id_product, review_body, rating } = req.body;
  try {
    const result = await reviewModel.updateReview(
      id,
      about_product,
      id_product,
      review_body,
      rating,
    );
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteRegisteredReview = async (req, res) => {
  const {id} = req.params
  try {
    await reviewModel.deleteReview(id);
    return res.status(200).json({ message: "Reseña eliminada con éxito" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const reviewController = {
  readAllReviews,
  readReviewsById,
  readReviewsByProduct,
  readReviewsByUser,
  createNewReview,
  updateRegisteredReview,
  deleteRegisteredReview,
};

export default reviewController;
