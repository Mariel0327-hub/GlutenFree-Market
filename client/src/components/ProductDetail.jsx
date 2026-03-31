import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";
import { FaStar, FaMinus, FaPlus } from "react-icons/fa";
import "../assets/css/ProductDetail.css";
import TestimonialsSection from "./TestimonialsSection";
import { UserContext } from "../context/UserContext";
//import { OrderContext } from "../context/OrderContext";
import { CartContext } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

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

  // 3. Si llegamos aquí, ES SEGURO que el producto existe
  const canReview =
    user &&
    user.orders?.some(
      (order) =>
        order.status === "Entregado" &&
        order.items?.some(
          (item) => String(item.product_id) === String(product?.product_id),
        ),
    );

  return (
    <div className="product-detail-container">
      <Container className="">
        <Row className="align-items-center gy-5">
          {/* Imagen del Producto */}
          <Col md={6} className="text-center">
            <div className="product-image-container p-4 shadow-sm rounded-4 bg-white">
              <img
                src={product.image_url}
                alt={product.title}
                className="img-fluid rounded-4"
                style={{ maxHeight: "350px" }}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1723910065922-67b84af65b23?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
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

        <TestimonialsSection
          productId={product.product_id}
          canReview={canReview}
        />
      </Container>
    </div>
  );
};

export default ProductDetail;
