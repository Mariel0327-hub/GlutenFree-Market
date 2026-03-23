import { pool } from "../db/db.js";
import pkg from 'pg-format';

//ver todos las reseñas
const findAllReviews = async() =>{
  const query = "SELECT * FROM cart_item";
  const { rows } = await pool.query(query);
  return rows;
}

//ver reseñas según id de usuario
const findReviewsByUSer = async()=>{

}

//ver reseñas según id de producto
const findReviewsByProduct = async()=>{

}

//ver reseñas según id de usuario
const findReviewsById = async()=>{

}

// crear producto
const createReview = async()=>{

}

// modificar producto
const updateReview = async()=>{

}

// DELETE !!
const deleteReview = async()=>{

}

const reviewModel = {

    findAllReviews,
    findReviewsByProduct,
    findReviewsByUSer,
    findReviewsById,
    createReview,
    updateReview,
    deleteReview
}

export default reviewModel