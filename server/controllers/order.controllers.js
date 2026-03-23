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

const readOrdersbyId = async () =>{
 try {
    await orderModel.findOrdersById()
 } catch (error) {
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const createNewOrder = async () =>{
 try {
    await orderModel.createOrders()
 } catch (error) {
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const updateNewOrder = async () =>{
 try {
    await orderModel.updateOrder()
 } catch (error) {
   return res.status(500).json({message: "Internal Server Error"}) 
 }   
}

const deleteNewOrder = async () =>{
 try {
    await orderModel.updateOrder()
 } catch (error) {
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