import React, { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import { FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "../assets/css/Cart.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const {
    cart,
    handleDecrease,
    addToCart,
    cartTotal,
    shippingCost,
    FREE_SHIPPING_THRESHOLD,
  } = useContext(CartContext);

  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }

    if (token) {
      navigate("/checkout");
    } else {
      navigate("/login?redirect=checkout");
    }
  };

  return (
    <>
      <div className="banner-divider-card"></div>
      <Container className="my-5 pt-5">
        <h2 className="titles-font text-center mb-5 fw-bold">
          Tu Carrito de Compras
        </h2>

        {cart.length === 0 ? (
          <div className="text-center py-5 shadow-sm bg-light rounded-4">
            <p className="lead mb-4">
              Parece que aún no has añadido nada delicioso.
            </p>
            <Button
              as={Link}
              to="/productos"
              variant="dark"
              className="rounded-pill px-5"
            >
              Explorar la tienda
            </Button>
          </div>
        ) : (
          <Row className="g-4">
            <Col lg={8}>
              {cart.map((item, index) => {
                const itemKey =
                  item?.id || item?.product_id || `cart-item-${index}`;

                // 2. Normalizamos  para evitar NaN o Null
                // Si item.price es null, usamos 0.
                const price = Number(item?.price || 0);
                const quantity = Number(item?.quantity || 0);
                const subtotal = price * quantity;

                // 3. El nombre y la imagen para respaldo
                const title = item?.title || "Producto";
                const imageUrl =
                  item?.image_url || "https://via.placeholder.com/150";

                return (
                  <div
                    key={itemKey}
                    className="cart-item-card-slim shadow-sm p-2 mb-3 rounded-4 border d-flex align-items-center bg-white"
                  >
                    <div className="cart-img-container-slim">
                      <img
                        src={imageUrl}
                        alt={item.title}
                        className="img-fluid rounded-3"
                        style={{
                          width: "60px",
                          height: "60px",
                          objectFit: "cover",
                        }}
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=100&h=100&fit=crop";
                        }}
                      />
                    </div>

                    <div className="ms-3 flex-grow-1">
                      <h6
                        className="fw-bold mb-0 text-truncate"
                        style={{ maxWidth: "200px" }}
                      >
                        {title}
                      </h6>
                      <p className="text-muted small mb-1">
                        ${price.toLocaleString("es-CL")}
                      </p>

                      <div className="d-flex align-items-center gap-2 mt-1">
                        <div className="qty-badge-slim border rounded-pill px-2 bg-light d-flex align-items-center">
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 btn-cart-qty bg-light"
                            onClick={() => handleDecrease(item)}
                          >
                            <FaMinus size={10} />
                          </Button>
                          <span className="fw-bold px-2 small">{item.qty}</span>
                          <Button
                            variant="link"
                            size="sm"
                            className="p-0 btn-cart-qty bg-light"
                            onClick={() => addToCart(item, 1, false)}
                          >
                            <FaPlus size={10} />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div
                      className="text-end pe-2"
                      style={{ minWidth: "100px" }}
                    >
                      <h6 className="fw-bold mb-0" style={{ color: "#7c5c4c" }}>
                        {/*  USAMOS EL SUBTOTAL CALCULADO ARRIBA */}$
                        {subtotal.toLocaleString("es-CL")}
                      </h6>
                    </div>
                  </div>
                );
              })}
            </Col>

            <Col lg={4}>
              <div className="cart-summary p-4 border rounded-4 bg-light">
                <h4 className="titles-font mb-4">Resumen de Compra</h4>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span className="fw-bold">
                    ${(Number(cartTotal) || 0).toLocaleString("es-CL")}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  {Number(cartTotal) >= FREE_SHIPPING_THRESHOLD ? (
                    <span className="text-success fw-bold">¡GRATIS!</span>
                  ) : (
                    <span className="fw-bold">
                      ${(Number(shippingCost) || 0).toLocaleString("es-CL")}
                    </span>
                  )}
                </div>

                <hr />

                <div className="d-flex justify-content-between fs-4 fw-bold">
                  <span>Total:</span>
                  <span style={{ color: "#3e2723" }}>
                    $
                    {(
                      (Number(cartTotal) || 0) +
                      (Number(cartTotal) >= FREE_SHIPPING_THRESHOLD
                        ? 0
                        : Number(shippingCost) || 0)
                    ).toLocaleString("es-CL")}
                  </span>
                </div>

                <Button
                  variant="dark"
                  className="w-100 rounded-pill mt-3"
                  onClick={handleCheckoutClick}
                >
                  Continuar al Pago
                </Button>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
