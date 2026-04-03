import Hero from "../components/Hero";
import React from "react";
import ProductCard from "../components/ProductCard";
import { ProductContext } from "../context/ProductContext";
import Categories from "../components/Categories.jsx";
import AllTestimonials from "./AllTestimonials.jsx";
import ImgGallery from "../components/ImageGallery.jsx";
import Newsletter from "../components/Newsletter.jsx";

export default function Home() {
  const { products } = React.useContext(ProductContext);

  return (
    <div className=" home-container">
      <Hero />
      <section className="container my-5">
        <h2 className="fw-bold mb-4 text-center">Productos de Temporada</h2>

        <div className="row g-2 justify-content-center">
          {" "}
          {products.map((p) => (
            <div
              key={p.product_id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center"
            >
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>
      <Categories />
      <div className="banner-divider"></div>
      <AllTestimonials limit={true} />
      <ImgGallery />
      <Newsletter />
    </div>
  );
}
