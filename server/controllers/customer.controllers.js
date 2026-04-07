import customerModel from "../models/customer.models.js";

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

    const result = await customerModel.deleteCustomer(id);

    if(!result){
      return res.status(404).json({message: `Cliente ${id} no encontrado`})
    }

    console.log(`Cliente ${id}, eliminadx exitosamente`);
    return res
      .status(200)
      .json({ message: `Cliente ${id}, eliminadx exitosamente` });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

/////FAVORITOS

const readAllFavorites = async (req, res) => {
  try {
    const result = await customerModel.findFavorites();
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const readAllFavoritesFiltered = async (req, res) => {
  const queryString = req.query;
  console.log(queryString);
  try {
    const result = await customerModel.findFavoritesFiltered(queryString);

    if (!result) {
      return res.status(404).json({ message: "No Products Found" });
    }

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

//Seleccionar y almacenar un producto favorito
const createNewFavorite = async (req, res) => {
  const { email } = req.user;
  const { favProduct } = req.body;

  try {
    const result = await customerModel.createFavorites(email, favProduct);

    if (!result) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    console.log(result);
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Potenciales correcciones (ante errores e base de datos)
const updateNewFavorite = async (req, res) => {
  try {
    await customerModel.updateFavorites();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
//Eliminar una seleccion de favoritos
const deleteNewFavorite = async (req, res) => {
  try {
    const{id} = req.user
    const { id_product } = req.params;


    const result = await customerModel.deleteFavorite(id, id_product);

       console.log("result:", result);

    if(!result){
      return res.status(400).json({message: "Favorito no encontrado"})
    }

    console.log(`Seleeción favorita ${id}, eliminada exitosamente`);
    return res
      .status(200)
      .json({ message: `Selección favorita ${id_product}, eliminada exitosamente` });
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
  readAllFavoritesFiltered,
  readFavoritesbyId,
  createNewFavorite,
  updateNewFavorite,
  deleteNewFavorite,
};

export default customerController;
