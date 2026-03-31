import { createContext, useState, useEffect } from "react";
import { productsData } from "../data/products"; // Importación directa de tu simulación de DB
import { getProductsDB } from "../data/connection"; // Tu nuevo puente a la API real (aunque no lo usaremos en este ejemplo)

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);
  const [lastAdded, setLastAdded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

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

  const filteredProducts = products
    .filter((p) => {
      const categoryFilter = filters.category.toLowerCase(); // "all", "cat-001", etc.
      const productCategory = (p.category || "").toLowerCase();

      // Si el filtro es "all", pasan todos. 
      // Si no, deben coincidir exactamente (ej: "cat-001" === "cat-001")
      return categoryFilter === "all" || productCategory === categoryFilter;
    })
    .filter((p) => normalize(p.title).includes(normalize(filters.searchTerm)))
    .sort((a, b) => {
      if (filters.sortBy === "low") return a.price - b.price;
      if (filters.sortBy === "high") return b.price - a.price;
      return 0;
    });

  // Función para agregar/quitar favoritos
  const toggleFavorite = (product) => {
    // 1. Usamos product_id para ser consistentes con tu objeto
    const isFavorite = favorites.some(
      (fav) => fav.product_id === product.product_id,
    );

    if (isFavorite) {
      // 2. Filtramos por product_id
      setFavorites(
        favorites.filter((fav) => fav.product_id !== product.product_id),
      );
    } else {
      // 3. Agregamos el producto completo al array
      setFavorites([...favorites, product]);
    }
  };

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } else {
      localStorage.removeItem("favorites");
    }
  }, [favorites]);

  useEffect(() => {
    const handleStorage = (event) => {
      if (event.key === "favorites") {
        const parsed = event.newValue ? JSON.parse(event.newValue) : [];
        setFavorites(Array.isArray(parsed) ? parsed : []);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

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
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
