import { Card, CardBody, Button } from "react-bootstrap";
import { FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import "../assets/css/ProductCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { favorites, toggleFavorite } = useContext(ProductContext);
  const isFav = favorites.some((fav) => fav.product_id === product.product_id);
  const { token } = useContext(UserContext);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { getCategoryName } = useContext(ProductContext);

  if (!product) return null;

  const handleFavoriteClick = () => {
    if (!token) {
      Swal.fire({
        title: "¡Vaya!",
        text: "Debes iniciar sesión para guardar tus favoritos",
        icon: "info",
        confirmButtonText: "Ir al Login",
        confirmButtonColor: "#3e2723",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/login");
        }
      });
      return;
    }
    toggleFavorite(product);
  };
  return (
    <Card className="product-card h-100 shadow-sm border-0">
      <Link
        to={`/producto/${product.product_id}`}
        style={{ textDecoration: "none" }}
      >
        <Card.Img
          variant="top"
          src={
            product.image_url && product.image_url.length > 10
              ? product.image_url
              : "https://images.unsplash.com/photo-1578985543062-bc3b01620c4d?w=400&h=300&fit=crop"
          }
          alt={product.title}
          style={{ height: "200px", objectFit: "cover" }}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=300&fit=crop"; // Una imagen de postre distinta por si la otra falla
          }}
        />
      </Link>
      <CardBody className="p-3 d-flex flex-column">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <div className="d-flex align-items-center text-warning small">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="me-1" />
            ))}
            <span className="text-muted ms-2" style={{ fontSize: "0.75rem" }}>
              3 Opiniones
            </span>
          </div>
          <FaHeart
            className="heart-icon fs-5"
            style={{
              cursor: "pointer",
              color: isFav ? "#e63946" : "#ced4da", // Rojo si es fav, gris si no
              transition: "color 0.3s ease",
            }}
            onClick={handleFavoriteClick}
          />
        </div>
        <div className="text-center flex-grow-1">
          <p
            className="text-muted small mb-1"
            style={{ textTransform: "capitalize" }}
          >
            {getCategoryName(product.category)}
          </p>
          <Card.Title className="card-title fw-bold mb-1 fs-6">
            {product.title}
          </Card.Title>

          <Card.Text
            className="text-muted small mb-3"
            style={{ fontSize: "0.8rem" }}
          >
            {(() => {
              const description =
                product.product_description ||
                product.description ||
                "Sin descripción disponible";
              return description.length > 60
                ? description.substring(0, 57) + "..."
                : description;
            })()}
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 px-1">
          <Button
            className="btn-add rounded-pill px-4"
            onClick={() => addToCart(product)}
          >
            Añadir
          </Button>
          <span className="price-tag fw-bold py-1 px-3 rounded-2">
            ${product.price.toLocaleString("es-CL")}
          </span>
        </div>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
