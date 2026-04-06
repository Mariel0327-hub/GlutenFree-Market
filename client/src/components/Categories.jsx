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
  const { categories } = useContext(ProductContext);
  const navigate = useNavigate();
  const handleCategoryClick = (id) => {
    // En lugar de actualizar el filtro aquí, dejamos que la URL lo haga
    navigate(`/productos/${id}`);
  };
  if (!categories || categories.length === 0) {
    return <p className="text-center my-5">Cargando categorías populares...</p>;
  }
  return (
    <section className="container my-5 text-center">
      <h2 className="mb-5 fw-bold titles-font">Categorías Populares</h2>

      <div className="row g-4 justify-content-center category-grid">
        {categories.map((cat) => (
          <div key={cat.category_id} className="category-col">
            {/* 1. Cambiamos el 'to' por '#' o lo manejamos todo en el onClick */}
            <div
              style={{ cursor: "pointer" }}
              onClick={() => handleCategoryClick(cat.category_id)}
              className="category-name text-decoration-none"
            >
              <div className="category-item">
                <div className="category-img-container shadow-sm">
                  <img
                    src={
                      categoryIcons[cat.category_id] ||
                      "ruta/imagen/por/defecto.png"
                    }
                    alt={cat.category_description}
                    className="category-img"
                  />
                </div>
                {/* Usamos el estilo que discutimos antes para que no se vea azul */}
                <p className="mt-3 fw-bold small text-uppercase text-dark">
                  {cat.category_description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
