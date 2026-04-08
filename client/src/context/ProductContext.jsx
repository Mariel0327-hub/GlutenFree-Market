import { createContext, useState, useEffect } from "react";
//import { productsData } from "../data/products"; // Importación directa de tu simulación de DB
import { getProductsDB } from "../data/connection"; // Tu nuevo puente a la API real (aunque no lo usaremos en este ejemplo)
import { baseURL } from "../utils/baseUrl";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [lastAdded, setLastAdded] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [categoryDummy, setCategoryDummy] = useState([]);
  const [categories, setCategories] = useState([]);

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
      setProducts([]);
      try {
        // 1. Obtener Productos
        const data = await getProductsDB();
        if (data) setProducts(data);

        // 2. Obtener Categorías (Ruta corregida)
        const resCat = await fetch(`${baseURL}/api/categories`);

        if (!resCat.ok) throw new Error("Error en la respuesta del servidor");

        const dataCat = await resCat.json();

        //console.log("Categorías cargadas:", dataCat);
        setCategories(dataCat);
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      const resCat = await fetch(`${baseURL}/api/categories`);

      if (!resCat.ok) throw new Error("Error en la respuesta del servidor");

      const dataCat = await resCat.json();
      //console.log("otras categories", dataCat);
      //console.log("id : ", dataCat[0].category_id);
      setCategoryDummy(dataCat[0]);
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    if (!categoryDummy?.category_id) return;

    //console.log("This is id is : ", categoryDummy);

    const fetchProdByCat = async () => {
      const prodCat = await fetch(
        `${baseURL}/api/products/category/${categoryDummy.category_id}`,
      );

      if (!prodCat.ok) throw new Error("Error en la respuesta del servidor");

      const FetchProdCat = await prodCat.json();
      //console.log("Productos", FetchProdCat);
    };

    fetchProdByCat();
  }, [categoryDummy]);

  // Lógica de filtrado dinámico
  const filteredProducts = products
    .filter((p) => {
      if (!p) return false;
      const categoryFilter = (filters.category || "all").toLowerCase().trim();

      const pCategory = String(p["id_category"] || p["category"] || "")
        .toLowerCase()
        .trim();
      

      return categoryFilter === "all" || pCategory === categoryFilter;
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
      } catch (error) {
        console.error("Backend no disponible, usando local.", error);
      }
    };
    fetchData();
  }, []);

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
  const getCategoryName = (categoryId) => {
    const found = categories.find(
      (cat) => String(cat.category_id) === String(categoryId),
    );
    return found ? found.category_description : "Productos";
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
        getCategoryName,
        categories,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
