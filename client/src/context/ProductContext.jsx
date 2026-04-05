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
  const normalize = (text) =>
    text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredProducts = products
    .filter((p) => {
      // 1. Normalizamos el filtro
      const categoryFilter = normalize(filters.category);

      if (categoryFilter === "all" || categoryFilter === "All") return true;

      //const categoryProduct = normalize(p.id_category || "");

      const categoryProduct = normalize(p.id_category || p.category || "");

      return categoryProduct === categoryFilter;
    })
    .filter((p) => normalize(p.title).includes(normalize(filters.searchTerm)))
    .sort((a, b) => {
      if (filters.sortBy === "low") return a.price - b.price;
      if (filters.sortBy === "high") return b.price - a.price;
      return 0;
    });

  useEffect(() => {
    const fetchData = async () => {
      setProducts([]);
      try {
        // 1. Obtener Productos
        const data = await getProductsDB();
        if (data) setProducts(data);

        // 2. Obtener Categorías (Ruta corregida)
        const resCat = await fetch(`${baseURL}/api/categories`);

        if (!resCat.ok) throw new Error("Error en la respuesta del servidor");

        const dataCat = await resCat.json();

        console.log("Categorías cargadas:", dataCat);
        setCategories(dataCat);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    fetchData();
  }, []);

  // Función para agregar/quitar favoritos
  const toggleFavorite = async (product) => {
    const isFav = favorites.some((f) => f.id_product === product.product_id);
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (isFav) {
        // Buscamos el favorito que queremos borrar para obtener su ID real de la tabla
        const favoriteToDelete = favorites.find(
          (f) => f.id_product === product.product_id,
        );

        if (favoriteToDelete && favoriteToDelete.favorites_id) {
          await axios.delete(
            `${baseURL}/api/customer/favorites/${favoriteToDelete.favorites_id}`,
            config,
          );
          // Actualizamos estado local
          setFavorites(
            favorites.filter((f) => f.id_product !== product.product_id),
          );
        }
      } else {
        const res = await axios.post(
          `${baseURL}/api/customer/favorites`,
          {
            favProduct: {
              id_product: product.product_id,
            },
          },
          config,
        );

        // Guardamos en local combinando la info
        const newFav = { ...product, favorites_id: res.data[0].favorites_id, id_product: product.product_id };
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

  const getCategoryName = (id) => {
    // 1. Verificamos que las categorías existan
    if (!categories || categories.length === 0) return "Cargando...";

    // 2. Buscamos usando 'id_category' (como se ve en la consola)
    // y lo comparamos con 'category_id' (como se ve en tu otra captura de categorías)
    const found = categories.find((cat) => cat.category_id === id);

    // 3. Devolvemos la descripción
    return found ? found.category_description : "Sin categoría";
  };
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
        categories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
