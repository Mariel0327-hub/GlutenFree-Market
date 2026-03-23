import React, { useContext } from "react";
import { Container, Table, Button } from "react-bootstrap";
import {FaPlus, FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import "../assets/css/Cart.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { CartContext } from "../context/CartContext";

export default function Cart() {
  const { cart, handleDecrease, addToCart, cartTotal, shippingCost, FREE_SHIPPING_THRESHOLD } =
    useContext(CartContext);

  const { token } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCheckoutClick = () => {
    if (token) {
      navigate("/checkout");
    } else {
      // Lo mandamos al login, pero avisamos que queremos volver a checkout
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
            {/* Lista de productos */}
            <Col lg={8}>
              {cart.map((item) => (
                <div
                  key={item.product_id}
                  className="cart-item-card-slim shadow-sm p-2 mb-3 rounded-4 border d-flex align-items-center bg-white"
                >
                  {/* Imagen con tamaño fijo y object-fit para que no se deforme */}
                  <div className="cart-img-container-slim">
                    <img
                      src={item.image_url}
                      className="rounded-3 object-fit-cover"
                      alt={item.title}
                    />
                  </div>

                  <div className="ms-3 flex-grow-1">
                    <h6
                      className="fw-bold mb-0 text-truncate"
                      style={{ maxWidth: "200px" }}
                    >
                      {item.title}
                    </h6>
                    <p className="text-muted small mb-1">
                      ${item.price.toLocaleString("es-CL")}
                    </p>

                    {/* Controles de cantidad más compactos */}
                    <div className="d-flex align-items-center gap-2 mt-1">
                      <div className="qty-badge-slim border rounded-pill px-2 bg-light d-flex align-items-center">
                        <Button
                          variant="link"
                          size="sm"
                          className=" p-0 btn-cart-qty bg-light"
                          onClick={() => handleDecrease(item)}
                        >
                          <FaMinus size={10} />
                        </Button>
                        <span className="fw-bold px-2 small">
                          {item.quantity}
                        </span>
                        <Button
                          variant="link"
                          size="sm"
                          className=" p-0 btn-cart-qty bg-light"
                          onClick={() => addToCart(item, 1, false)}
                        >
                          <FaPlus size={10} />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Subtotal compacto a la derecha */}
                  <div className="text-end pe-2" style={{ minWidth: "100px" }}>
                    <h6 className="fw-bold mb-0" style={{ color: "#7c5c4c" }}>
                      ${(item.price * item.quantity).toLocaleString("es-CL")}
                    </h6>
                  </div>
                </div>
              ))}
            </Col>

            {/* Resumen de la compra */}
            <Col lg={4}>
              <div className="cart-summary p-4 border rounded-4 bg-light">
                <h4 className="titles-font mb-4">Resumen de Compra</h4>

                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal:</span>
                  <span className="fw-bold">
                    ${cartTotal.toLocaleString("es-CL")}
                  </span>
                </div>

                <div className="d-flex justify-content-between mb-2">
                  <span>Envío:</span>
                  {cartTotal >= FREE_SHIPPING_THRESHOLD ? (
                    <span className="text-success fw-bold">¡GRATIS!</span>
                  ) : (
                    <span className="fw-bold">
                      ${shippingCost.toLocaleString("es-CL")}
                    </span>
                  )}
                </div>

                {/* 🚀 Tip de UX: Barra de progreso para envío gratis */}
                {cartTotal < FREE_SHIPPING_THRESHOLD && (
                  <div className="mt-3">
                    <small className="text-muted d-block mb-1">
                      ¡Estás a solo{" "}
                      <strong>
                        $
                        {(FREE_SHIPPING_THRESHOLD - cartTotal).toLocaleString(
                          "es-CL",
                        )}
                      </strong>{" "}
                      del envío gratis!
                    </small>
                    <div className="progress" style={{ height: "8px" }}>
                      <div
                        className="progress-bar bg-success"
                        style={{
                          width: `${(cartTotal / FREE_SHIPPING_THRESHOLD) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                )}

                <hr />

                <div className="d-flex justify-content-between fs-4 fw-bold">
                  <span>Total:</span>
                  <span style={{ color: "#3e2723" }}>
                    ${(cartTotal+ shippingCost).toLocaleString("es-CL")}
                  </span>
                </div>

                <Button
                  variant="dark"
                  className="w-100 rounded-pill"
                  onClick={handleCheckoutClick}
                >
                  Continuar al Pago
                </Button>
                <p className="text-center text-muted mt-3 small">
                  🔒 Compra segura y protegida
                </p>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </>
  );
}
