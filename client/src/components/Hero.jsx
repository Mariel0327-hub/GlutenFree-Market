import React from "react";
import "../assets/css/Hero.css";

export default function Hero() {
  return (
    <div className="hero-container shadow-smd-flex align-items-center">
      <div className="container-fluid px-5">
        <div className="row align-items-center">
          <div className="col-lg-6">
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
            <div className="d-flex gap-3">
              <button className="btn  btn-lg rounded-pill px-5">
                Ver Productos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
