import axios from "axios";

//esta es la  URL servidor Node
const API_URL = "http://localhost:3000";

// obtenemos los productos
export const getProductsDB = async () => {
  try {
    const token = localStorage.getItem("token"); // <--- Recuperamos el pase

    const response = await axios.get("http://localhost:3000/products", {
      headers: {
        Authorization: `Bearer ${token}`, // <--- Se lo mostramos al guardia
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error en getProductsDB:", error.response?.status);
    throw error; // Para que el Context sepa que falló
  }
};

// aqui vamos a guardar el Token en el navegador
export const loginUserDB = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    // Guardamos el token para usarlo después en Favoritos
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
