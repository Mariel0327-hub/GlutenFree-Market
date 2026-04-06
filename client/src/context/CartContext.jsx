import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { ProductContext } from "./ProductContext";
import { baseURL } from "../utils/baseUrl.js";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { token, user } = useContext(UserContext);
  const { products } = useContext(ProductContext);
  const [showToast, setShowToast] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("glutenfree_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("glutenfree_cart", JSON.stringify(cart));
    }
  }, [cart]);
  // 1. CARGA INICIAL(Nombres/Precios)
  useEffect(() => {
    const fetchCartAndDetails = async () => {
      // 1. Siempre intentamos recuperar lo que hay en localStorage primero
      const localItems = JSON.parse(
        localStorage.getItem("glutenfree_cart") || "[]",
      );

      if (token && user?.customer_id && products.length > 0) {
        try {
          const config = { headers: { Authorization: `Bearer ${token}` } };
          const resCart = await axios.get(
            `${baseURL}/api/cart/customer/${user.customer_id}`,
            config,
          );

          if (resCart.data) {
            // 2. FUSIÓN: Unimos lo de la DB con lo que el usuario eligió como invitado
            const dbItems = resCart.data;

            // Creamos un mapa para no duplicar productos
            const mergedMap = {};

            // Priorizamos o sumamos según tu lógica (aquí sumamos cantidades)
            [
              ...dbItems.map((d) => ({
                product_id: d.id_product,
                quantity: d.quantity,
              })),
              ...localItems,
            ].forEach((item) => {
              if (mergedMap[item.product_id]) {
                mergedMap[item.product_id].quantity += item.quantity;
              } else {
                mergedMap[item.product_id] = item;
              }
            });

            const finalCart = Object.values(mergedMap);
            setCart(finalCart);

            localStorage.removeItem("glutenfree_cart");
          }
        } catch (err) {
          setCart(localItems);
        }
      } else {
        setCart(localItems);
      }
    };

    fetchCartAndDetails();
  }, [token, user, products]);
  const addToCart = async (product) => {
    // 1. Definimos el ID
    const pId = String(product.product_id || product.id);

    // 2. Creamos el objeto para el Toast con valores por defecto
    const toastProduct = {
      ...product,
      product_id: pId,
      title: product.title || product.nombre || "Producto",
      image_url: product.image_url || product.imagen || "",
    };

    // 3. ACTUALIZACIÓN DE ESTADOS
    setLastAdded(toastProduct);
    setShowToast(true);

    const exists = cart.find((i) => String(i.product_id) === pId);

    setCart((prev) => {
      if (exists)
        return prev.map((i) =>
          String(i.product_id) === pId ? { ...i, quantity: i.quantity + 1 } : i,
        );
      return [...prev, { ...product, product_id: pId, quantity: 1 }];
    });

    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        if (exists) {
          await axios.put(
            `${baseURL}/api/cart/product`,
            { product: { id_product: pId, quantity: exists.quantity + 1 } },
            config,
          );
        } else {
          await axios.post(
            `${baseURL}/api/cart/product`,
            { newCartProduct: { id_product: pId, quantity: 1 } },
            config,
          );
        }
      } catch (e) {
        // Si falla por falta de instancia, creamos carrito y reintentamos una vez
        if (e.response?.status === 500) {
          await axios.post(`${baseURL}/api/cart/`, {}, config);
          await axios.post(
            `${baseURL}/api/cart/product`,
            { newCartProduct: { id_product: pId, quantity: 1 } },
            config,
          );
        }
      }
    }
  };

  // 3. DISMINUIR O ELIMINAR (PUT / DELETE)
  const handleDecrease = async (product) => {
    const pId = String(product.product_id);
    const item = cart.find((i) => String(i.product_id) === pId);
    if (!item) return;

    if (item.quantity === 1) {
      setCart((prev) => prev.filter((i) => String(i.product_id) !== pId));
    } else {
      setCart((prev) =>
        prev.map((i) =>
          String(i.product_id) === pId ? { ...i, quantity: i.quantity - 1 } : i,
        ),
      );
    }

    if (token) {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      try {
        if (item.quantity === 1) {
          // DELETE
          await axios.delete(`${baseURL}/api/cart/product`, {
            ...config,
            data: { productToDelete: { id_product: pId } },
          });
        } else {
          // PUT para actualizar cantidad
          await axios.put(
            `${baseURL}/api/cart/product`,
            {
              product: { id_product: pId, quantity: item.quantity - 1 },
            },
            config,
          );
        }
      } catch (e) {
        console.error("Error al disminuir:", e);
      }
    }
  };

  const cartTotal = cart.reduce(
    (acc, i) => acc + Number(i.price) * i.quantity,
    0,
  );

  const shippingCost = cartTotal > 30000 || cartTotal === 0 ? 0 : 3990;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        handleDecrease,
        cartTotal,
        shippingCost,
        setLastAdded,
        showToast,
        setShowToast,
        setCart,
        lastAdded,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
