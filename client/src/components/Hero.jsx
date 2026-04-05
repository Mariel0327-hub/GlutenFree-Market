import React from "react";
import "../assets/css/Hero.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import heroImage from '../assets/imgs/heroGLUTEN.png';

export default function Hero() {
  const { setFilters } = useContext(ProductContext);

  const handleViewAll = () => {
    // Al hacer clic en "Ver Productos", reseteamos los filtros a "all"
    setFilters((prev) => ({
      ...prev,
      category: "all",
      searchTerm: "",
    }));
  };
  return (
    <div className="hero-container shadow-smd-flex align-items-center" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="container-fluid px-5">
        <div className="row align-items-center">
          <div className="col-lg-6 mb-5">
            <h1 className="hero-title">
              Disfruta sin límites.
              <br />
              Todo lo que amas,
              <br />
              <span>100% Gluten-Free</span>
            </h1>
            <p className="hero-description">
              Encuentra la mejor selección de panes, pastas y snacks
              certificados. Calidad garantizada para celíacos y amantes de la
              vida saludable.
            </p>
            <Link
              to="/productos"
              className="btn btn-warning btn-lg rounded-pill px-5 text-decoration-none fw-bold shadow-sm"
              onClick={handleViewAll}
            >
              Ver Productos
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
