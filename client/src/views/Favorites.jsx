import React, { useContext } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

export default function Favorites() {
  // 1. Consumimos el array de favoritos del contexto
  const { favorites } = useContext(ProductContext);

  return (
    <>
      <div className="banner-divider-card"></div>
      <Container className="py-5">
        <h2 className="fw-bold mb-4">
          Mis Favoritos
        </h2>

        <hr className="mb-5 opacity-25" />

        {/* 2. Si no hay favoritos, mostramos un mensaje amigable */}
        {favorites.length === 0 ? (
          <Alert
            variant="light"
            className="text-center shadow-sm rounded-4 py-5"
          >
            <h4 className="text-muted">¡Tu lista está vacía!</h4>
            <p className="mb-0">
              Explora nuestra tienda y guarda los panes que más te gusten.
            </p>
          </Alert>
        ) : (
          /* 3. Si hay favoritos, renderizamos las mismas Cards que en la Home */
          <Row xs={1} md={2} lg={3} className="g-4">
            {favorites.map((product) => (
              <Col key={product.product_id}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </>
  );
}
