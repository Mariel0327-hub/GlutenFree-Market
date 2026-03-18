import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";
import { FaStar, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";
import "../assets/css/ProductDetail.css";
import TestimonialsSection from "./TestimonialsSection";

const ProductDetail = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ProductContext);
  const [cantidad, setCantidad] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const product = products.find((p) => String(p.product_id) === String(id));

  // Si no hay producto, mostramos un error CON MARGEN para que se vea
  if (!product) {
    return (
      <div
        style={{ paddingTop: "150px", textAlign: "center", minHeight: "60vh" }}
      >
        <h2 className="text-danger">Ups! Producto no encontrado</h2>
        <p>
          Buscamos el ID: <strong>{id}</strong>
        </p>
        <p>Productos cargados actualmente: {products.length}</p>
        <Button onClick={() => window.history.back()}>Volver atrás</Button>
      </div>
    );
  }
  return (
    <div className="product-detail-container">
      <Container className="my-5 pt-5">
        <Row className="align-items-center gy-5">
          {/* Imagen del Producto */}
          <Col md={6} className="text-center">
            <div className="product-image-container p-4 shadow-sm rounded-4 bg-white">
              <img
                src={product.image_url}
                alt={product.title}
                className="img-fluid rounded-4"
                style={{ maxHeight: "450px" }}
              />
            </div>
          </Col>

          {/* Info del Producto */}
          <Col md={6}>
            <h1
              className="display-5 fw-bold titles-font mb-2"
              style={{ color: "#3e2723" }}
            >
              {product.title}
            </h1>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="text-warning">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
              </div>
              <span className="text-muted small">
                (4.8 / 5 basado en 12 reseñas)
              </span>
            </div>

            <h2 className="fw-bold mb-4" style={{ color: "#7c5c4c" }}>
              ${product.price?.toLocaleString("es-CL")}
            </h2>

            <p className="text-muted body-font mb-4">
              {product.description ||
                "Delicioso postre artesanal 100% libre de gluten, elaborado con los más altos estándares de calidad para que disfrutes sin preocupaciones."}
            </p>

            <div className="d-flex align-items-center gap-4 mb-4">

              <div className="quantity-selector d-flex align-items-center">
                <button
                  onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                  className="btn-qty"
                >
                  <FaMinus />
                </button>
                <span className="px-4 fw-bold">{cantidad}</span>
                <button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="btn-qty"
                >
                  <FaPlus />
                </button>
              </div>
              <span className="text-muted small">¡Quedan pocas unidades!</span>
            </div>

            <div className="d-flex gap-3">
              <Button className="btn-order-now px-5 py-2 rounded-pill fw-bold">
                Ordenar ahora
              </Button>
              <Button
                variant="dark"
                className="btn-order-now px-5"
                onClick={() => addToCart(product, cantidad, true)}
              >
                Añadir al carrito
              </Button>
            </div>
          </Col>
        </Row>

        <TestimonialsSection />
      </Container>
    </div>
  );
};

export default ProductDetail;
