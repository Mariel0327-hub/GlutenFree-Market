import cartModel from "../models/cart.models.js";
//import jwt from "jsonwebtoken";
//import bycrpt from "bcryptjs";

const readAllCart = async (req, res) => {
  try {
    const result = await cartModel.findallCarts();

    if (!result) {
      return res.status(404).json({ message: "No Carts Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readCartById = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await cartModel.findCartById(id);

    if (!result) {
      return res.status(404).json({ message: "Cart not Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readCartByCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await cartModel.findCartByCustomer(id);

    if (!result) {
      return res.status(404).json({ message: "No Cart Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//ORDER DETAILS:
const readAllCartDetails = async (req, res) => {
  try {
    const result = await cartModel.findCartDetails();

    if (!result) {
      return res.status(404).json({ message: "Cart-detail not Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readCartsDetailsbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await cartModel.findCartDetailsbyId(id);

    if (!result) {
      return res.status(404).json({ message: "Cart-detail not Found" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
///////////////////////

const createNewCart = async (req, res) => {
  const { email } = req.user;
  const { cart } = req.body;
  try {
    const result = await cartModel.createCart(email, cart);

    if (!result) {
      return res.status(404).json({ message: "No cart Created" });
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNewCart = async (req, res) => {
  const {} = req.body;
  const { id } = req.params;
  try {
    const result = await cartModel.updateCart(id);

    if (!result) {
      return res.status(404).json({ message: "No cart Mofidied" });
    }

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Eliminar un Carrito (ADMIN ONLY)
const deleteNewCart = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await cartModel.deleteCart(id);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "No cart deleted" });
    }

    console.log(`Carrito ${id}, eliminado exitosamente`);
    return res
      .status(200)
      .json({ message: `Carrito ${id}, eliminado exitosamente` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const cartController = {
  readAllCart,
  readCartById,
  readCartByCustomer,
  readAllCartDetails,
  readCartsDetailsbyId,
  createNewCart,
  updateNewCart,
  deleteNewCart,
};

export default cartController;
