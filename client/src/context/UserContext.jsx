import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");

    if (savedUser) {
      return JSON.parse(savedUser);
    } else {
      return {
        email: "test@test.com",
        name: "Usuario Demo",
        avatar_url:
          "https://images.unsplash.com/photo-1589254065909-b7086229d08c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        role: "user",
        shipping_address: "Calle Falsa 123, Santiago",
        // 📦 Agregamos los pedidos de prueba
        orders: [
          {
            id: "ORD-001",
            date: "2026-03-20",
            total: 25000,
            status: "Entregado",
            items: 3,
          },
          {
            id: "ORD-002",
            date: "2026-03-22",
            total: 12500,
            status: "Por retirar",
            items: 1,
          },
          {
            id: "ORD-003",
            date: "2026-03-22",
            total: 18000,
            status: "En proceso",
            items: 2,
          },
        ],
      };
    }
  });
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || "token-demo-123",
  );

  useEffect(() => {
    if (token && !user) {
      const savedUser = localStorage.getItem("user");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, [token, user]);

  const login = (userData) => {
    const mockToken = "secure-jwt-token-123";

    setToken(mockToken);
    setUser(userData);

    localStorage.setItem("token", mockToken);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const updateUser = async (newData) => {
    try {
      // 1. Simulamos una pequeña espera (opcional, para ver el efecto)
      // await new Promise(resolve => setTimeout(resolve, 500));

      // 2. Creamos el nuevo estado del usuario
      const updatedUser = { ...user, ...newData };

      // 3. Actualizamos el estado global y el localStorage
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      // 4. Devolvemos el objeto de éxito que tu 'handleSave' necesita
      return { success: true };
    } catch (error) {
      console.error("Error al actualizar:", error);
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
