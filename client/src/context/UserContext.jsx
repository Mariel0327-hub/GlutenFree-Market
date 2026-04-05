import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { baseURL } from "../utils/baseUrl.js";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null,
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
    const correctedUser = {
      ...userData,
      customer_id: userData.customer_id || userData.id || userData.id_customer,
    };

    const authToken = token;

    setToken(authToken);
    setUser(correctedUser);

    localStorage.setItem("token", authToken);
    localStorage.setItem("user", JSON.stringify(correctedUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    
  };

  const updateUser = async (newData) => {
    try {
      const token = localStorage.getItem("token");
      const userId = user?.customer_id;

      if (!userId) {
        console.error("No se encontró customer_id");
        return { success: false, message: "Error de identidad" };
      }

      // AGREGAMOS /api A LA RUTA
      const response = await axios.put(
        `${baseURL}}/api/auth/alter_profile/${userId}`,
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
      console.error("Error en update:", error.response?.status);
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
