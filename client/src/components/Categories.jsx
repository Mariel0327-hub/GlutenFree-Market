import { categories } from "../data/categories";
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
  1: iconPan,
  2: iconPasta,
  3: iconSnack,
  4: iconHarinas,
  5: iconChocolate,
  6: iconCafe,
  7: iconReposteria,
  8: iconBebidas,
  9: iconGranos,
  10: iconCereales,
};

const Categories = () => {
  const { setFilters } = useContext(ProductContext);
  const navigate = useNavigate();

  const handleCategoryClick = (categorySlug) => {
    setFilters((prev) => ({
      ...prev,
      category: categorySlug,
      searchTerm: "", 
    }));

    navigate("/productos");
  };
  return (
    <section className="container my-5 text-center">
      <h2 className="mb-5 fw-bold titles-font">Categorías Populares</h2>

      <div className="row g-4 justify-content-center category-grid">
        {categories.map((cat) => (
          <div key={cat.category_id} className="category-col">
            <Link
              to={`/productos/${cat.description.toLowerCase()}`}
              className="text-decoration-none text-dark"
              onClick={() => handleCategoryClick(cat.description.toLowerCase())}
            >
              <div className="category-item">
                <div className="category-img-container shadow-sm">
                  <img
                    src={categoryIcons[cat.category_id]}
                    alt={cat.description}
                    className="category-img"
                  />
                </div>
                <p className="mt-3 fw-bold small text-uppercase body-font text-truncate">
                  {cat.description}
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
