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

const readCartById = async(req,res) =>{
  const { id } = req.params;
  try {
    const result = await cartModel.findCartById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

const readCartByCustomer = async(req,res) =>{
  const { id } = req.params;
  try {
    const result = await cartModel.findCartByCustomer(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}


const createNewCart = async(req,res) =>{
    const {customer_id, cart} = req.body
    try {
        const result = await cartModel.createCart(customer_id, cart)
        return res.status(201).json(result)
    } catch (error) {
        console.error(error)
        return res.status(500).json({message: "Internal Server Error"})
    }
}


const updateNewCart = async(req,res) =>{
    try {
        await cartModel.updateCart()
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

//!!!!!
const deleteNewCart = async(req,res) =>{
    try {
        await cartModel.deleteCart()
    } catch (error) {
        return res.status(500).json({message: "Internal Server Error"})
    }
}

const cartController = {
    readAllCart,
    readCartById,
    readCartByCustomer,
    createNewCart,
    updateNewCart,
    deleteNewCart,
}

export default cartController