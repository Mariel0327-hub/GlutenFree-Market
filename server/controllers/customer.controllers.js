import customerModel from "../models/customer.models.js";
import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";

///////////REHACER PARA CRUD DDE FAVORITOS Y SEGUIMIENTO DE CLIENTES

const readAllOrders = async (req, res) => {
  try {
    const result = await customerModel.findOrders();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readOrdersbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await customerModel.findOrdersById(id);

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
    const result = await customerModel.findOrdersByCustomer(id);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewOrder = async (req, res) => {
  const { email } = req.user;
  try {
    const order = await customerModel.createOrders(email);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNewOrder = async (req, res) => {
  try {
    await customerModel.updateOrder();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNewOrder = async (req, res) => {
  try {
    const { id } = req.params;

    await customerModel.deleteOrder(id);

    console.log(`Orden de compra ${id}, eliminada exitosamente`);
    return res
      .status(200)
      .json({ message: `Orden de compra ${id}, eliminada exitosamente` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const customerController = {
  readAllOrders,
  readOrdersbyId,
  readOrdersbyCustomer,
  createNewOrder,
  updateNewOrder,
  deleteNewOrder,
};

export default customerController;
