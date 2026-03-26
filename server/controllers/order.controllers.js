import orderModel from "../models/order.models.js";
import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";

const readAllOrders = async (req, res) => {
  try {
    const result = await orderModel.findOrders();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readOrdersbyId = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await orderModel.findOrdersById(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readOrdersbyCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await orderModel.findOrdersByCustomer(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewOrder = async (req, res) => {
  const { email } = req.user;
  try {
    const order = await orderModel.createOrders(email);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNewOrder = async (req, res) => {
  try {
    await orderModel.updateOrder();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNewOrder = async (req, res) => {
  const { id } = req.params;
  try {
    await orderModel.deleteOrder(id);
    console.log(`Orden de compra ${id}, eliminada exitosamente`);
    return res
      .status(200)
      .json({ message: `Orden de compra ${id}, eliminada exitosamente` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const orderController = {
  readAllOrders,
  readOrdersbyId,
  readOrdersbyCustomer,
  createNewOrder,
  updateNewOrder,
  deleteNewOrder,
};

export default orderController;
