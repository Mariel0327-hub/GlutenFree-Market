import iconPan from "../assets/imgs/pannaderia.png";
import iconPasta from "../assets/imgs/pastas.png";
import iconSnack from "../assets/imgs/snack.png";
import iconHarinas from "../assets/imgs/harinas.png";
import iconChocolate from "../assets/imgs/chocolate.png";
import iconCafe from "../assets/imgs/cafe.png";
import iconReposteria from "../assets/imgs/reposteria.png";
import iconBebidas from "../assets/imgs/bebidas.png";
import iconGranos from "../assets/imgs/granos.png";
import iconCereales from "../assets/imgs/cereal.png";
import "../assets/css/Categories.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const categoryIcons = {
  "cat-panaderia": iconPan,
  "cat-pastas": iconPasta,
  "cat-snacks": iconSnack,
  "cat-harinas": iconHarinas,
  "cat-chocolate": iconChocolate,
  "cat-cafe": iconCafe,
  "cat-reposteria": iconReposteria,
  "cat-bebidas": iconBebidas,
  "cat-granos": iconGranos,
  "cat-cereales": iconCereales,
};

const Categories = () => {
  const { setFilters, categories } = useContext(ProductContext); 
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    setFilters((prev) => ({
      ...prev,
      category: categoryId,
      searchTerm: "",
    }));

    navigate("/productos");
  };
  //if (!categories || categories.length === 0) return <p>Cargando categorías...</p>;
  return (
    <section className="container my-5 text-center">
      <h2 className="mb-5 fw-bold titles-font">Categorías Populares</h2>

      <div className="row g-4 justify-content-center category-grid">
        {categories.map((cat) => (
          <div key={cat.category_id} className="category-col">
            <Link
              to="/productos"
              onClick={() => handleCategoryClick(cat.category_id)} // Enviará "cat-panaderia"
            >
              <div className="category-item">
                <div className="category-img-container shadow-sm">
                  <img
                    src={categoryIcons[cat.category_id]} // Buscará "cat-panaderia" en el objeto
                    alt={cat.category_description}
                    className="category-img"
                  />
                </div>
                <p className="mt-3 fw-bold small text-uppercase">
                  {cat.category_description} {/* Mostrará "Panadería" */}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
