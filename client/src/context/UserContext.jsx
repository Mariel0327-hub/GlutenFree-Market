import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null, // Quitamos el token-demo
  );

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = (userData, token) => {
    // [ESTRATEGIA] Si Pablo te lo manda como 'id', lo renombramos a 'customer_id'
    // para que coincida con tu base de datos Neon.
    const correctedUser = {
      ...userData,
      customer_id: userData.customer_id || userData.id, // Usa el que venga disponible
    };

    console.log("Usuario guardado en el Contexto:", correctedUser);

    setToken(token);
    setUser(correctedUser);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(correctedUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const updateUser = async (newData) => {
    try {
      const token = localStorage.getItem("token");

      // [CORRECCIÓN] Declaramos la variable extrayéndola del estado 'user'
      // Revisa si en tu objeto se llama 'customer_id' o solo 'id'
      const userId =
        user?.customer_id || user?.id || user?.id_customer || user?.uid;

      if (!userId) {
        console.error("No se encontró el ID del usuario en el estado");
        return { success: false, message: "Error de identidad" };
      }

      console.log(`Petición a: http://localhost:3000/auth/profile/${userId}`);

      const response = await axios.put(
        `http://localhost:3000/auth/profile/${userId}`,
        newData,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (response.status === 200) {
        const updatedUser = { ...user, ...newData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { success: true };
      }
    } catch (error) {
      // Si vuelve a dar 404, es que la ruta NO lleva el ID al final
      console.error(
        "Error en la petición:",
        error.response?.status || error.message,
      );
      return { success: false };
    }
  };

  return (
    <UserContext.Provider
      value={{ user, token, login, logout, updateUser, setToken, setUser }}
    >
      {children}
    </UserContext.Provider>
  );
};
