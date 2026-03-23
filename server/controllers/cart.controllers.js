import cartModel from "../models/cart.models.js";
import jwt from "jsonwebtoken"
import bycrpt from 'bcryptjs'

const readAllCart = async(req,res) =>{
  try {
    const result = await cartModel.findCart();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const readCartById = async() =>{
    try {
        await cartModel.findCart()
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}


const createNewCart = async() =>{
    try {
        await cartModel.createCart()
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}


const updateNewCart = async() =>{
    try {
        await cartModel.updateCart()
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

//!!!!!
const deleteNewCart = async() =>{
    try {
        await cartModel.deleteCart()
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const cartController = {
    readAllCart,
    readCartById,
    createNewCart,
    updateNewCart,
    deleteNewCart,
}

export default cartController