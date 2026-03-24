import orderModel from "../models/order.models.js";
import jwt from "jsonwebtoken"
import bycrpt from 'bcryptjs'

const readAllOrders = async (req,res) =>{
  try {
    const result = await orderModel.findOrders();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  } 
}

const readOrdersbyId = async (req,res) =>{
const {id} = req.params
 try {
    const result = await orderModel.findOrdersById(id)
    return res.status(200).json(result);
 } catch (error) {
  console.error(error);
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const createNewOrder = async (req,res) =>{
 try {
    await orderModel.createOrders()
 } catch (error) {
  console.error(error);
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const updateNewOrder = async (req,res) =>{
 try {
    await orderModel.updateOrder()
 } catch (error) {
  console.error(error);
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const deleteNewOrder = async (req,res) =>{
 try {
    await orderModel.updateOrder()
 } catch (error) {
  console.error(error);
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const orderController = {
    readAllOrders,
    readOrdersbyId,
    createNewOrder,
    updateNewOrder,
    deleteNewOrder,
}

export default orderController