import customerModel from "../models/customer.models.js";
import jwt from "jsonwebtoken";
import bycrpt from "bcryptjs";

/* 
DE MOMENTO, CLIENTES Y FAVORITOS ESTÁN JUNTOS EN LA MEDIDA QUE HAY UNA RELACIÓN DIRECTA ENTRE AMBAS TABLAS Y LAS RTAS NO SON LO SUFICIENTEMENTE COMPLEJAS COMO PARA SEPARARLAS. PARA VERSIONES POSTERIORES, DE CRECER MÁS DE LO CONTROLABLE EN ESTA FORMA, SE SEPARARÁN LAS RUTAS EN /customers ; /favorites. 
De momento las rutas serán /customer -> /customer/favorites;
Debido a que solo un cliente registrado puede tener favoritos.
 */
//Clientes
const readAllCustomers = async (req, res) => {
  try {
    const result = await customerModel.findCustomers();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readCustomersbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await customerModel.findCustomerById(id);

    if (!result) {
      return res.status(404).json({ message: "WRONG ID" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNewCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    await customerModel.deleteCustomer(id);

    console.log(`Cliente ${id}, eliminadx exitosamente`);
    return res
      .status(200)
      .json({ message: `Cliente ${id}, eliminadx exitosamente` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


/////Favroritos
const readAllFavorites = async (req, res) => {
  try {
    const result = await customerModel.findFavorites();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readFavoritesbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await customerModel.findFavoritesById(id);

    if (!result) {
      return res.status(404).json({ message: "Internal Server Error" });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


const createNewFavorite = async (req, res) => {
  const { email } = req.user;
  try {
    const order = await customerModel.createFavorites(email);
    res.status(201).json(order);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateNewFavorite = async (req, res) => {
  try {
    await customerModel.updateFavorites();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteNewFavorite = async (req, res) => {
  try {
    const { id } = req.params;

    await customerModel.deleteFavorite(id);

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
  readAllCustomers,
  readCustomersbyId,
  deleteNewCustomer,
  readAllFavorites,
  readFavoritesbyId,
  createNewFavorite,
  updateNewFavorite,
  deleteNewFavorite,
};

export default customerController;