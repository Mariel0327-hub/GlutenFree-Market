import React, { createContext, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

const addOrder = (newOrder) => {
  setOrders((prevOrders) => [newOrder, ...prevOrders]);
};

  // Función  para tus reseñas
  const userHasPurchasedProduct = (productId) => {
    return orders.some(
      (order) =>
        order.status === "Entregado" &&
        order.items.some((item) => String(item.product_id) === String(productId))
    );
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder,  userHasPurchasedProduct }}>
      {children}
    </OrderContext.Provider>
  );
};
