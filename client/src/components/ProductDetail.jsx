import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";
import { FaStar, FaMinus, FaPlus } from "react-icons/fa";
import "../assets/css/ProductDetail.css";
import TestimonialsSection from "./TestimonialsSection";
import { UserContext } from "../context/UserContext";
//import { OrderContext } from "../context/OrderContext";
import { CartContext } from "../context/CartContext";
import { ReviewContext } from "../context/ReviewContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const { reviews } = useContext(ReviewContext);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //Buscamos el producto
  const product = products.find((p) => String(p.product_id) === String(id));

  // 2.Si no hay producto, cortamos la ejecución aquí
  if (!product) {
    return (
      <div>
        <h2 className="text-danger fw-bold">¡Ups! Producto no encontrado</h2>
        <p className="text-muted">
          Parece que el producto con ID {id} no existe en nuestro catálogo.
        </p>
        <Button
          variant="dark"
          className="rounded-pill px-4"
          onClick={() => navigate("/tienda")}
        >
          Volver a la tienda
        </Button>
      </div>
    );
  }

  // Buscamos las reseñas específicas de este producto
  const productReviews = reviews.filter(
    (r) => String(r.id_product) === String(id),
  );

  return (
    <div className="product-detail-container">
      <div className="banner-divider-card pt-5 "></div>
      <Container>
        <Row className="align-items-center gy-5 ">
          {/* Imagen del Producto */}
          <Col md={6} className="text-center">
            <div className="product-image-container p-4 shadow-sm rounded-4 bg-white h-100 d-flex align-items-center justify-content-center">
              <img
                // 1. Verificamos si existe la URL antes de intentar cargarla
                src={
                  product.image_url && product.image_url.length > 10
                    ? product.image_url
                    : "https://images.unsplash.com/photo-1578985543062-bc3b01620c4d?w=800&q=80"
                }
                alt={product.title}
                className="img-fluid rounded-4 shadow-sm"
                style={{
                  maxHeight: "450px", // Le damos un poco más de aire en el detalle
                  width: "auto",
                  objectFit: "contain",
                }}
                // 2. Si la URL del back existe pero el link está caído, entra el fallback
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src =
                    "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=800&q=80";
                }}
              />
            </div>
          </Col>

          {/* Info del Producto */}
          <Col md={6}>
            <h1 className="display-5 fw-bold titles-font mb-2">
              {product.title}
            </h1>
            <div className="d-flex align-items-center gap-2 mb-3">
              <div className="text-warning">
                <FaStar /> <FaStar /> <FaStar /> <FaStar /> <FaStar />
              </div>
              <span className="text-muted small">(Reseñas)</span>
            </div>

            <h2 className="fw-bold mb-4">
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
              <div className="mt-3">
                {/*Aqui implemente esta logica para cuando quedan pocas unidades del producto */}
                {product.stock > 0 && product.stock <= 5 ? (
                  <div
                    className="d-flex align-items-center gap-2 py-2 px-3 bg-warning bg-opacity-10 rounded-3 border border-warning border-opacity-25"
                    style={{ width: "fit-content" }}
                  >
                    <span className="text-muted small fw-bold">
                      ¡Quedan pocas unidades! Solo {product.stock} disponibles.
                    </span>
                  </div>
                ) : product.stock === 0 ? (
                  <Badge bg="danger" className="rounded-pill px-3 py-2">
                    Agotado
                  </Badge>
                ) : null}
              </div>
            </div>

            <div className="d-flex gap-3">
              <Button
                className="btn-order-now px-5 py-2 rounded-pill fw-bold"
                onClick={() => navigate("/checkout")}
              >
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

        <div className="mt-5 pt-5 border-top">
          <h3 className="titles-font fw-bold mb-4 text-center">
            Lo que dicen nuestros clientes
          </h3>

          {productReviews.length > 0 ? (
            <Row className="g-4">
              {productReviews.map((rev) => (
                <Col md={6} key={rev.review_id}>
                  <Card className="border-0 shadow-sm rounded-4 h-100 bg-light p-4">
                    <Card.Body>
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <div className="d-flex align-items-center gap-2">
                          {/* Un icono de usuario le da más vida */}
                          <div className="bg-white rounded-circle p-2 shadow-sm">
                            <FaStar
                              className="text-warning"
                              style={{ fontSize: "0.8rem" }}
                            />
                          </div>
                          <span className="fw-bold text-secondary">
                            {rev.user_name || "Cliente Satisfecho"}
                          </span>
                        </div>
                        <div className="text-warning small">
                          {"⭐".repeat(rev.rating)}
                        </div>
                      </div>
                      <p className="text-muted mb-0 fst-italic">
                        "{rev.review_body}"
                      </p>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5 bg-light rounded-4 border border-dashed">
              <p className="text-muted mb-0">
                Aún no hay reseñas para este producto. ¡Sé el primero en
                calificar!
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
