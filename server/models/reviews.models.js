import { pool } from "../db/db.js";
import pkg from "pg-format";

//ver todos las reseñas
const findAllReviews = async () => {
  const query = "SELECT * FROM cart_item";
  const { rows } = await pool.query(query);
  return rows;
};

/////////////BY ID AND BY USER //// CHECK ROUTES
//ver reseñas según id de usuario
const findReviewsByUSer = async ({ customer_id }) => {
  const query = "SELECT * FROM review where customer_id = $1";
  const { rows } = await pool.query(query, [customer_id]);
  return rows[0];
};

//ver reseñas según id de producto
const findReviewsByProduct = async ({ product_id }) => {
  const query = "SELECT * FROM review where product_id = $1";
  const { rows } = await pool.query(query, [product_id]);
  return rows[0];
};

//ver reseñas según id de usuario
const findReviewsById = async (id) => {
  const query = "SELECT * FROM cart_item WHERE id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

// crear producto  /// pasar a reviews!!!
const createReview = async ({ about_review, review_body, rating }) => {
  const review_id = `rev-${Math.floor(Math.random() * 3000)}`;
  const created_at = new Date();
  const updated_at = null;
  const query = "INSERT INTO product values($1, $2, $3)";
  const values = [
    review_id,
    about_review,
    review_body,
    rating,
    created_at,
    updated_at,
  ];
  const { rows } = await pool.query(query, values);
  return rows;
};

// modificar producto  // pasar a reviews!!!
const updateReview = async ({ id, about_review, review_body, rating }) => {
  const updated_at = new Date();
  const query =
    "UPDATE product SET about_review = $1, review_body = $2, rating = $3, updated_at = $4 WHERE review_id = $5 RETURNING *";
  const values = [about_review, review_body, rating, updated_at, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// DELETE !!
const deleteReview = async (id) => {
  const query = "UPDATE review WHERE review_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows[0];
};

const reviewModel = {
  findAllReviews,
  findReviewsByProduct,
  findReviewsByUSer,
  findReviewsById,
  createReview,
  updateReview,
  deleteReview,
};

export default reviewModel;