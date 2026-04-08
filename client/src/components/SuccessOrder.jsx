import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

export default function SuccessOrder() {
  const location = useLocation();
  const orderNumber = location.state?.orderNumber || "#000000";

  return (
    <Container className="container-fluid text-center py-5 my-5">
      <div className="d-flex flex-column align-items-center">
        <p className="text-uppercase fw-bold text-muted small mb-1">
          Orden Exitosa
        </p>

        <h3 className="fw-bold mb-4">¡Gracias por su pedido!</h3>

        <div className="mb-4" style={{ maxWidth: "200px" }}>
          <img
            src="/ordenExitosa.png"
            alt="Orden Exitosa"
            className="img-fluid mb-4"
          />
        </div>
        <h4 className="mb-3">El número de pedido es: </h4>
        <span className="fw-light">#{orderNumber}</span>

        <p className="text-muted mb-4 px-3" style={{ maxWidth: "300px" }}>
          Puedes realizar el seguimiento de tu pedido en la sección "Mis
          pedidos".
        </p>
        <div className="d-flex flex-column flex-md-row gap-3 mt-2">
          <Button
            as={Link}
            to="/mis-pedidos"
            variant="dark"
            className="rounded-pill px-4 py-2 shadow-sm"
          >
            Seguimiento de mi pedido
          </Button>

          <Button
            as={Link}
            to="/"
            variant="outline-dark"
            className="rounded-pill px-4 py-2 shadow-sm"
          >
            Continuar comprando
          </Button>
        </div>
      </div>
    </Container>
  );
}
