import orderModel from "../models/order.models.js";

//ORDENES
//ADMIN
const readAllOrders = async (req, res) => {
  try {
    const result = await orderModel.findOrders();

    if (!result) {
      return res.status(404).json({ message: "No Orders Found" });
    }

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
      return res.status(404).json({ message: "Order not Found or Invalid Id" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//CLIENTE (restringido a validación de token)
const readOrdersbyCustomer = async (req, res) => {
  const { id } = req.user;
  try {
    const result = await orderModel.findOrdersByCustomer(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Orders from customer not Found or Invalid Id" });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//DETALLES DE ORDEN:
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

//ADMIN
//Para encontrar detalles en específico // se agrega filtro de usuario para evitar acceso a ordenes agenas.
const readOrderDetailsbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await orderModel.findOrderDetailsbyId(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Order-detail not Found or Invalid Id" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

////Para encontrar detalles de compra de un cliente (restringido a cliente)
const readOrderDetailsbyCustomer = async (req, res) => {
  try {
    const { id } = req.user;
    const { order_id } = req.params;
    const result = await orderModel.findOrderDetailsbyCustomer(id, order_id);

    if (!result || result.length === 0) {
      return res
        .status(404)
        .json({ message: "Order-detail or customer Id not Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Crear orden de compra
const createNewOrder = async (req, res) => {
  const { id } = req.user;
  try {
    const order = await orderModel.createOrders(id);

    if (!order) {
      throw { code: 404, message: "Not order found" };
    }

    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// acutalizar orden de compra
const updateNewOrder = async (req, res) => {
  const { id } = req.params;
  const orderToUpdate  = req.body;
  try {
    const result = await orderModel.updateOrder(id, orderToUpdate);

    if (!result) {
      return res.status(404).json({message: "No order to update" });
    }

    return res.status(200).json(result);
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
  readOrderDetailsbyCustomer,
};

export default orderController;
