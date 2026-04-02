import axios from "axios";

// 1. Agregamos el /api a la URL base
const API_URL = "http://localhost:3000/api";

// obtenemos los productos
export const getProductsDB = async () => {
  try {
    const token = localStorage.getItem("token");
    // Usamos la constante ${API_URL} para que sea dinámico
    const response = await axios.get(`${API_URL}/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getProductsDB:", error.response?.status);
    throw error;
  }
};

// 2. Login de usuario
export const loginUserDB = async (credentials) => {
  try {
    // Ahora esto apuntará automáticamente a http://localhost:3000/api/auth/login
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
    return response.data;
  } catch (error) {
    console.error("Error en el login:", error.response?.data || error.message);
    throw error;
  }
};

// 3. Favoritos: Enviando el Token de seguridad
export const getFavoritesDB = async () => {
  try {
    const token = localStorage.getItem("token");
    // Ahora esto apuntará a http://localhost:3000/api/customer/favorites
    const response = await axios.get(`${API_URL}/customer/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    return null;
  }
};

// Función para registrar usuario en la DB
export const registerUserDB = async (userData) => {
  try {
    const response = await axios.post("http://localhost:3000/api/auth/register", userData);
    return response.data;
  } catch (error) {
    console.error("Error en el registro:", error.response?.data || error.message);
    throw error;
  }
};