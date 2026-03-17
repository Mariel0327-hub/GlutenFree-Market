import { Card, CardBody, Button } from "react-bootstrap";
import { FaStar, FaHeart } from "react-icons/fa";
import "../assets/css/ProductCard.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

const ProductCard = ({ product }) => {

  const { addToCart } = useContext(ProductContext);


  if (!product) return null;

  return (
    <Card className="product-card h-100 shadow-sm border-0">
      <Link
        to={`/producto/${product.product_id}`}
        style={{ textDecoration: "none" }}
      >
        <Card.Img
          src={product.image_url}
          className="card-img-top"
          alt={product.title}
          style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
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
          <FaHeart className="heart-icon fs-5" style={{ cursor: "pointer" }} />
        </div>
        <div className="text-center flex-grow-1">
          {" "}
          <Card.Title className="card-title fw-bold mb-1 fs-6">
            {product.title}
          </Card.Title>
          <Card.Text
            className="text-muted small mb-3"
            style={{ fontSize: "0.8rem" }}
          >
            {product.description.length > 60
              ? product.description.substring(0, 57) + "..."
              : product.description}
          </Card.Text>
        </div>

        <div className="d-flex justify-content-between align-items-center mt-3 px-1">
          <Button
            className="btn-add rounded-pill px-4"
            onClick={() => addToCart(product, 1)}
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
