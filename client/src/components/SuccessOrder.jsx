import React from "react";
import { Link } from "react-router-dom";
import { Container, Button, Image } from "react-bootstrap";

export default function SuccessOrder() {
  // En un caso real,traemos el ID del pedido desde un estado global o URL
  const orderNumber = "#123456";
  return (
    <Container className="text-center py-5 my-5">
      <div className="d-flex flex-column align-items-center">
        {/* Etiqueta superior */}
        <p className="text-uppercase fw-bold text-muted small mb-1">
          Orden Exitosa
        </p>

        {/* Título Principal */}
        <h1 className="fw-bold mb-4">¡Gracias por su pedido!</h1>

        {/* Ilustración (puedes usar un SVG o PNG similar al de la captura) */}
        <div className="mb-4" style={{ maxWidth: "300px" }}>
          <img
            src="/ordenExitosa.png" alt="Orden Exitosa" className="img-fluid mb-4"
          />
        </div>

        {/* Texto informativo */}
        <h4 className="mb-3">
          El número de pedido es: <span className="fw-bold">{orderNumber}</span>
        </h4>
        <p className="text-muted mb-4 px-3" style={{ maxWidth: "500px" }}>
          Puedes realizar el seguimiento de tu pedido en la sección "Mis
          pedidos".
        </p>

        {/* Botones de acción */}
        <div className="d-flex flex-column flex-md-row gap-3 mt-2">
          <Button
            as={Link}
            to="/mis-pedidos"
            variant="dark"
            className="rounded-pill px-4 py-2 shadow-sm"
            style={{ backgroundColor: "#6d4c41", border: "none" }} // Color café de tu marca
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
