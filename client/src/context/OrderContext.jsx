import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

const addOrder = (newOrder) => {
  setOrders((prevOrders) => [newOrder, ...prevOrders]);
};

  // Función  para tus reseñas
const userHasPurchasedProduct = (productId) => {
  return orders.some((order) => {
    // 🚩 Usamos la misma lógica booleana que en tu Badge
    const isShipped = order.is_shipped === true || order.is_shipped === "t" || order.is_shipped === 1;
    
    return (
      isShipped && // Solo si está entregado/enviado
      order.items?.some((item) => String(item.product_id) === String(productId))
    );
  });
};

  return (
    <OrderContext.Provider value={{ orders, addOrder,  userHasPurchasedProduct }}>
      {children}
    </OrderContext.Provider>
  );
};
