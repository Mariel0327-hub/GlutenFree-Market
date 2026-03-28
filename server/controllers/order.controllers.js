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
  try {
    const { id } = req.params;
    const result = await orderModel.findOrdersById(id);

    if (!result) {
      return res.status(404).json({ message: "Order not Found" });
    }

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

//ORDER DETAILS:
const readAllOrderDetails = async (req, res) => {
  try {
    const result = await orderModel.findOrderDetails();

    if (!result) {
      return res.status(404).json({ message: "Order-detail not Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readOrderDetailsbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await orderModel.findOrderDetailsbyId(id);

    if (!result) {
      return res.status(404).json({ message: "Order-detail not Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
///////////////////////

const createNewOrder = async (req, res) => {
  const { id } = req.user;
  try {
    const order = await orderModel.createOrders(id);

    if(!order){
      throw {code: 404, message: "Not order found"}
    }

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
  try {
    const { id } = req.params;

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
  //Order-details
  readAllOrderDetails,
  readOrderDetailsbyId,
};

export default orderController;
