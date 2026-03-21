import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  // Función para vaciar el carrito (la que necesitabas para el bug)
  const clearCart = () => setCart([]);

  const addToCart = (product, quantity = 1, toast = true) => {
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.product_id === product.product_id,
      );
      if (existing) {
        return prevCart.map((item) =>
          item.product_id === product.product_id
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
    if (toast) {
      setLastAdded(product);
      setShowToast(true);
    }
  };

  const handleDecrease = (product) => {
    setCart((prevCart) => {
      const item = prevCart.find((i) => i.product_id === product.product_id);
      if (item?.quantity === 1) {
        return prevCart.filter((i) => i.product_id !== product.product_id);
      }
      return prevCart.map((i) =>
        i.product_id === product.product_id
          ? { ...i, quantity: i.quantity - 1 }
          : i,
      );
    });
  };

  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        handleDecrease,
        clearCart,
        cartTotal,
        showToast,
        setShowToast,
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
