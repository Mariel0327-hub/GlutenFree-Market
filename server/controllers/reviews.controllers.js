import reviewModel from "../models/reviews.models.js";
import jwt from "jsonwebtoken"
import bycrpt from 'bcryptjs'

const readAllReviews = async (req,res) =>{
  try {
    const result = await reviewModel.findAllReviews();
    return res.status(200).json(result);
  } catch (error) {
    console.error();
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


const readReviewsByUser = async () =>{
 try {
    await reviewModel.findReviewsByUSer()
 } catch (error) {
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const readReviewsByProduct = async () =>{
 try {
    await reviewModel.findReviewsByProduct()
 } catch (error) {
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

// for inner purposes
const readReviewsById = async () =>{
 try {
    await reviewModel.findReviewsById()
 } catch (error) {
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const createNewReview = async () =>{
 try {
    await reviewModel.createReview()
 } catch (error) {
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const updateRegisteredReview = async () =>{
 try {
    await reviewModel.updateReview()
 } catch (error) {
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const deleteRegisteredReview = async () =>{
 try {
    await reviewModel.deleteReview()
 } catch (error) {
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const reviewController = {
    readAllReviews,
    readReviewsById,
    readReviewsByProduct,
    readReviewsByUser,
    createNewReview,
    updateRegisteredReview,
    deleteRegisteredReview,
}

export default reviewController