import { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [showToast, setShowToast] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart");
    }
  }, [cart]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "cart") {
        const parsed = event.newValue ? JSON.parse(event.newValue) : [];
        setCart(Array.isArray(parsed) ? parsed : []);
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Función para vaciar el carrito (la que necesitabas para el bug)
  const clearCart = () => setCart([]);

  const addToCart = (product, quantity = 1, toast = true) => {
    const pId = product.product_id || product.id;

    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => (item.product_id || item.id) === pId,
      );

      if (existing) {
        return prevCart.map((item) =>
          (item.product_id || item.id) === pId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      const productToStore = {
        product_id: pId,
        title: product.title,
        price: Number(product.price),
        image_url: product.image_url,
        quantity: quantity,
      };

      return [...prevCart, productToStore];
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

  // Sumamos el precio * cantidad de cada producto
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  // Definimos el umbral para que se active el envio gratis si el usuario tiene una compra con esta cantidad
  const FREE_SHIPPING_THRESHOLD = 20000;
  const shippingCost = cartTotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5000;

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
        shippingCost,
        FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
