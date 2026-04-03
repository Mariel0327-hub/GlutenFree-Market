import cartModel from "../models/cart.models.js";

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

//Crear nueva instancia de carrito
const createNewCartInstance = async (req, res) => {
  const { id } = req.user;

  try {
    const result = await cartModel.createCartInstance(id);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Cart Product not Found/Created" });
    }

    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const createNewCartProduct = async (req, res) => {
  try {
    const { id } = req.user;
    const { newCartProduct } = req.body;
    const result = await cartModel.addProductToCart(id, newCartProduct);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Cart Product not Found/Created" });
    }
    console.log(newCartProduct);
    console.log(result);
    return res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//Actualizar cantidad -> Para Botones + -
const updateExistingCartProduct = async (req, res) => {
  try {
    // producto considera id de producto y cantidad de producto
    const { product } = req.body;
    const { id } = req.user;
    const result = await cartModel.updateCartProduct(id, product);

    if (!result) {
      return res
        .status(404)
        .json({ message: "Cart Product not Found/Updated" });
    }
    console.log(product);
    console.log(result);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Eliminar un Carrito (ADMIN ONLY)
const deleteExistingCartProduct = async (req, res) => {
  const { id } = req.user;
  const { productToDelete } = req.body;
  try {
    const result = await cartModel.deleteProductFromCart(id, productToDelete);

    if (!result) {
      return res.status(404).json({ message: "No cart deleted" });
    }

    console.log(`Carrito ${id}, eliminado exitosamente`);
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    if (error.code === 404) {
      return res.status(404).json({ message: error.message });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Eliminar un Carrito (ADMIN ONLY)
const deleteNewCart = async (req, res) => {
  try {
    const { id } = req.params;

    await cartModel.deleteCart(id);

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
  //lecturas de carrito
  readAllCart,
  readCartById,
  readCartByCustomer,
  readAllCartDetails,
  readCartsDetailsbyId,

  //product managing:
  createNewCartInstance,
  createNewCartProduct,
  updateExistingCartProduct,
  deleteExistingCartProduct,

  //eliminar un carrito corrupto
  deleteNewCart,
};

export default cartController;
