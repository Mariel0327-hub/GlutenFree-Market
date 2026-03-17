import axios from 'axios';

const API_URL = "http://localhost:3000/api";

export const getProductsDB = async () => {
    try {
        const response = await axios.get(`${API_URL}/products`);
        return response.data;
    } catch (error) {
        console.warn("Backend no detectado. Trabajando con datos locales.", error);
        return null; // El contexto recibirá null y usará el respaldo
    }
};