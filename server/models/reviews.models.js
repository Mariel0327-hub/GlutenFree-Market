import { pool } from "../db/db.js";
import pkg from "pg-format";

//ver todos las reseñas
const findAllReviews = async () => {
  const query = "SELECT * FROM review";
  const { rows } = await pool.query(query);
  return rows;
};

/////////////BY ID AND BY USER //// CHECK ROUTES
//ver reseñas según id de usuario
const findReviewsByUSer = async (id) => {
  const query = "SELECT * FROM review where id_customer = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

//ver reseñas según id de producto
const findReviewsByProduct = async (id) => {
  const query = "SELECT * FROM review where id_product = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

//ver reseñas según id de usuario
const findReviewsById = async (id) => {
  const query = "SELECT * FROM review WHERE review_id = $1";
  const { rows } = await pool.query(query, [id]);
  return rows;
};

// crear review /// tratar de customer y product_id
const createReview = async (about_product, review_body, rating) => {
  const review_id = `rev-${Math.floor(Math.random() * 3000)}`;
  const created_at = new Date();
  const updated_at = null;
  about_product = true;
  const query = "INSERT INTO review (review_id, about_product, review_body, rating,created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
  const values = [
    review_id,
    about_product,
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
    "UPDATE review SET about_review = $1, review_body = $2, rating = $3, updated_at = $4 WHERE review_id = $5 RETURNING *";
  const values = [about_review, review_body, rating, updated_at, id];
  const { rows } = await pool.query(query, values);
  return rows[0];
};

// DELETE !!
const deleteReview = async (id) => {
  const query = "DELETE review WHERE review_id = $1";
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