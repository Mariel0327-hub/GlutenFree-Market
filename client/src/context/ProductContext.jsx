import { createContext, useState, useEffect } from "react";
import { productsData } from "../data/products"; // Importación directa de tu simulación de DB
import { getProductsDB } from "../data/connection"; // Tu nuevo puente a la API real (aunque no lo usaremos en este ejemplo)

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);
  const [cart, setCart] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductsDB();
        if (data && data.length > 0) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Backend no disponible, usando local.", error);
      }
    };
    fetchData();
  }, []);

  const addToCart = (product, quantity = 1) => {
    setCart((prevCart) => {
      // 1. Buscamos si el producto ya está en el carrito
      const existingProductIndex = prevCart.findIndex(
        (item) => item.product_id === product.product_id,
      );

      if (existingProductIndex >= 0) {
        // 2. Si ya existe, creamos una copia del carrito y actualizamos la cantidad
        const newCart = [...prevCart];
        newCart[existingProductIndex] = {
          ...newCart[existingProductIndex],
          quantity: newCart[existingProductIndex].quantity + quantity,
        };
        return newCart;
      } else {
        // 3. Si es nuevo, lo agregamos con la cantidad inicial
        return [...prevCart, { ...product, quantity }];
      }
    });
    setLastAdded(product);
    setShowToast(true);
  };

  // Función para eliminar
  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.product_id !== productId),
    );
  };
  // Función para añadir al carrito
  const cartTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        addToCart,
        removeFromCart,
        cartTotal,
        showToast,
        setShowToast,
        lastAdded,
        searchTerm,
        setSearchTerm,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
