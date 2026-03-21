import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaCookieBite } from "react-icons/fa";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container className="text-center py-5 my-5">
      <div
        className="p-5 shadow-elegant rounded-4 bg-white mx-auto"
        style={{ maxWidth: "600px" }}
      >
        <h1 className="display-1 fw-bold text-muted opacity-25">404</h1>
        <FaCookieBite size={80} className="mb-4" style={{ color: "#7c5c4c" }} />

        <h2 className="titles-font fw-bold mb-3">
          ¡Ups! Alguien se comió esta página
        </h2>
        <p className="text-muted mb-4 lead">
          Lo sentimos, la página que buscas no existe o ha sido movida. Pero no
          te preocupes, ¡tenemos muchas cosas ricas esperándote!
        </p>

        <div className="d-flex gap-3 justify-content-center">
          <Button
            variant="outline-dark"
            className="rounded-pill px-4"
            onClick={() => navigate(-1)} // Vuelve a la página anterior
          >
            Volver atrás
          </Button>

          <Button
            variant="dark"
            className="rounded-pill px-4"
            onClick={() => navigate("/")} // Va al Home
          >
            Ir al Inicio
          </Button>
        </div>
      </div>
    </Container>
  );
}
