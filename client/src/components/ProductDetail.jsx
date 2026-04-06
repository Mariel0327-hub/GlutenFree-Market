import React, { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";
import { FaStar, FaMinus, FaPlus } from "react-icons/fa";
import "../assets/css/ProductDetail.css";
import { CartContext } from "../context/CartContext";
import { ReviewContext } from "../context/ReviewContext";
import ProductCard from "../components/ProductCard";
import { calcularPromedio } from "../utils/reviewHelper";

const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [cantidad, setCantidad] = useState(1);
  const navigate = useNavigate();
  const { reviews } = useContext(ReviewContext);
  const [randomProducts, setRandomProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  //Buscamos el producto
  const product = products.find((p) => String(p.product_id) === String(id));

  useEffect(() => {
    if (products && products.length > 0) {
      //2. Filtramos para no mostrar el actual
      const otherProducts = products.filter(
        (p) => String(p.product_id) !== String(id),
      );

      // 3. Mezclamos (esto solo ocurrirá una vez al cargar el componente o cambiar de producto)
      const shuffled = [...otherProducts].sort(() => Math.random() - 0.5);

      // 4. Guardamos los primeros 3
      setRandomProducts(shuffled.slice(0, 4));
    }
  }, [products, id]);

  if (!product) {
    return (
      <Container className="py-5 text-center">
        <h2 className="text-danger fw-bold">¡Ups! Producto no encontrado</h2>
        <p className="text-muted">
          Parece que el producto con ID {id} no existe.
        </p>
        <Button
          variant="dark"
          className="rounded-pill px-4"
          onClick={() => navigate("/tienda")}
        >
          Volver a la tienda
        </Button>
      </Container>
    );
  }
  // Buscamos las reseñas específicas de este producto
  const productReviews = reviews.filter(
    (r) => String(r.id_product) === String(id),
  );
  const promedio = calcularPromedio(productReviews);

  const handleOrderNow = () => {
    addToCart(product, quantity);

    navigate("/checkout");
  };

  return (
    <div className="product-detail-container ">
      <div className="banner-divider-card pt-5 "></div>
      <Container className="pt-5 ">
        <Row className="align-items-center gy-5 ">
          {/* Imagen del Producto */}
          <Col md={6} className="text-center product-detail">
            <div className="product-image-container shadow-sm rounded-4 bg-white h-100 overflow-hidden d-flex">
              <img
                // 1. Verificamos si existe la URL antes de intentar cargarla
                src={
                  product.image_url && product.image_url.length > 10
                    ? product.image_url
                    : "https://images.unsplash.com/photo-1578985543062-bc3b01620c4d?w=800&q=80"
                }
                alt={product.title}
                className="w-100 h-100 img-product-detail"
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
              <div className="text-warning small d-flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar
                    key={star}
                    style={{
                      color: star <= promedio ? "#ffc107" : "#e4e5e9",
                    }}
                  />
                ))}
                <small className="ms-2 text-muted">
                  ({productReviews.length})
                </small>
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
                <Button
                  onClick={() => cantidad > 1 && setCantidad(cantidad - 1)}
                  className="btn-qty"
                >
                  <FaMinus />
                </Button>
                <span className="px-4 fw-bold">{cantidad}</span>
                <Button
                  onClick={() => setCantidad(cantidad + 1)}
                  className="btn-qty"
                >
                  <FaPlus />
                </Button>
              </div>
              <div className="mt-3">
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
                className="btn px-5 py-2 rounded-pill fw-bold"
                onClick={handleOrderNow}
              >
                Ordenar ahora
              </Button>
              <Button
                variant="dark"
                className="px-5 btn"
                onClick={() => addToCart(product, cantidad, true)}
              >
                Añadir al carrito
              </Button>
            </div>
          </Col>
        </Row>

        <div className="mt-5 pt-5 border-top ">
          <h3 className="titles-font  mb-4 text-start">
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
                        <div className="text-warning small d-flex gap-1">
                          <div className="text-warning small d-flex gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <FaStar
                                key={star}
                                style={{
                                  color:
                                    star <= rev.rating ? "#ffc107" : "#e4e5e9",
                                }}
                              />
                            ))}
                          </div>
                          <small className="ms-2 text-muted">
                            ({productReviews.length})
                          </small>
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
        <div className="mt-5">
          <h3 className="mb-4">Productos que te pueden gustar</h3>

          <div className="row g-4 justify-content-center">
            {randomProducts.map((item) => (
              <div
                className="col-12 col-sm-6 col-md-4 col-lg-3"
                key={item.product_id}
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetail;
