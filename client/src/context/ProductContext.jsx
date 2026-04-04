import { createContext, useState, useEffect } from "react";
import { productsData } from "../data/products";
import { getProductsDB } from "../data/connection";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { baseURL } from "../utils/baseUrl.js";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);
  const [categories, setCategories] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("user_favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const { token } = useContext(UserContext);

  const [filters, setFilters] = useState({
    category: "All",
    searchTerm: "",
    sortBy: "default",
  });
  // 1. Función para quitar tildes y dejar en minúsculas
  const normalize = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  // Lógica de filtrado dinámico
  const filteredProducts = products
    .filter((p) => {
      // Normalizamos ambos para comparar "panaderia" con "panaderia"
      const categoryProduct = normalize(p.category || "");
      const categoryFilter = normalize(filters.category);

      return categoryFilter === "all" || categoryProduct === categoryFilter;
    })
    .filter((p) => normalize(p.title).includes(normalize(filters.searchTerm)))
    .sort((a, b) => {
      if (filters.sortBy === "low") return a.price - b.price;
      if (filters.sortBy === "high") return b.price - a.price;
      return 0;
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductsDB();
        if (data && data.length > 0) {
          setProducts(data);
        }
        const resCat = await fetch(`${baseURL}/api/categories`);
        const dataCat = await resCat.json();
        setCategories(dataCat);
      } catch (error) {
        console.error("Backend no disponible, usando local.", error);
      }
    };
    fetchData();
  }, []);

  // Función para agregar/quitar favoritos
  const toggleFavorite = async (product) => {
    const isFav = favorites.some((f) => f.product_id === product.product_id);
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (isFav) {
        // Buscamos el favorito que queremos borrar para obtener su ID real de la tabla
        const favoriteToDelete = favorites.find(
          (f) => f.product_id === product.product_id,
        );

        if (favoriteToDelete && favoriteToDelete.favoritos_id) {
          await axios.delete(
            `${baseURL}/api/customer/favorites/${favoriteToDelete.favoritos_id}`,
            config,
          );
          // Actualizamos estado local
          setFavorites(
            favorites.filter((f) => f.product_id !== product.product_id),
          );
        }
      } else {
        // 2. Agregar (Backend + Local)
        // 🚩 CAMBIO AQUÍ: Debe ser POST y enviar el objeto que espera tu controlador
        // Creamos el objeto exactamente como el backend lo necesita
        const res = await axios.post(
          `${baseURL}/api/customer/favorites`,
          {
            favProduct: {
              id_product: product.product_id, // Cambiamos product_id por id_product
            },
          },
          config,
        );

        // Guardamos en local combinando la info
        const newFav = { ...product, favoritos_id: res.data[0].favoritos_id };
        setFavorites([...favorites, newFav]);
      }
    } catch (error) {
      console.error("Error de persistencia en Backend:", error);
      // Si falla el server, al menos que funcione en el navegador (Local)
      if (!isFav) setFavorites([...favorites, product]);
    }
  };

  useEffect(() => {
    localStorage.setItem("user_favorites", JSON.stringify(favorites));
  }, [favorites]);

  const getCategoryName = (catId) => {
    const found = categories.find((c) => c.category_id === catId);
    return found ? found.category_description : "Cargando...";
  };
  console.log("Mostrando las categorias:", categories);

  return (
    <ProductContext.Provider
      value={{
        products,
        lastAdded,
        searchTerm,
        setSearchTerm,
        favorites,
        toggleFavorite,
        filteredProducts,
        setFilters,
        filters,
        //fetchFavorites,
        getCategoryName,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
