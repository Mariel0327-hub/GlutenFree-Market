import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(localStorage.getItem("token") || null);

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

  const updateUser = async (updatedData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        setUser((prevUser) => {
          const newUser = { ...prevUser, ...updatedData };
          localStorage.setItem("user", JSON.stringify(newUser)); // Actualizamos storage
          return newUser;
        });
        resolve({ success: true });
      }, 1000);
    });
  };

  return (
    <UserContext.Provider value={{ user, token, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};