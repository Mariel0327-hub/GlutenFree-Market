import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { addOrder } = useContext(OrderContext);

  const handlePayment = () => {
    // 1. Creamos el objeto de la orden con los datos actuales
    const newOrder = {
      order_id: Math.floor(Math.random() * 10000), // ID aleatorio para el simulacro
      date: new Date().toLocaleDateString("es-CL"),
      total: cartTotal,
      status: "Pendiente",
      items: [...cart], //  Guardamos una copia de los productos actuales del carrito
      shippingData: formData, // También podrías guardar los datos de envío
    };

    // 2. Guardamos la orden en el estado global de órdenes
    addOrder(newOrder);

    // 3. Limpiamos el carrito y navegamos
    clearCart();
    navigate("/success");
  };
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    direccion: "",
  });

  // Manejador de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefono") {
      // Filtramos para que solo queden números
      const onlyNums = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({
        ...prev,
        [name]: onlyNums,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  //aqui verificamos que todos los campos tengan texto
  // 1. Verificamos si el carrito tiene algo
  const isCartEmpty = cart.length === 0;

  // 2. Verificamos si falta información
  const isInfoIncomplete =
    formData.nombre.trim() === "" ||
    formData.telefono.length !== 9 ||
    formData.direccion.trim() === "";

  // 3. El formulario es inválido si el carrito está vacío O la info está incompleta
  const isFormInvalid = isCartEmpty || isInfoIncomplete;

  return (
    <Container className="py-5">
      <Row>
        <Col md={8}>
          <Card className="shadow-sm p-4 mb-4 border-0 rounded-4">
            <h4 className="fw-bold mb-3">Información de Envío</h4>
            <Form>
              <Row>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="small fw-bold">
                      Nombre Completo
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Juan Pérez"
                      className="rounded-3"
                      onChange={handleChange}
                      value={formData.nombre}
                      name="nombre"
                    />
                  </Form.Group>
                </Col>
                <Col md={6} className="mb-3">
                  <Form.Group>
                    <Form.Label className="small fw-bold">Teléfono</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text rounded-start-3 bg-light border-end-0">
                        🇨🇱 +56
                      </span>
                      <Form.Control
                        type="text"
                        name="telefono"
                        placeholder="9 8765 4321"
                        className="rounded-end-3 border-start-0"
                        onChange={handleChange}
                        value={formData.telefono}
                        inputMode="numeric"
                        maxLength="9"
                      />
                    </div>
                    <Form.Text className="text-muted small">
                      Ingresa los 9 dígitos de tu número.
                    </Form.Text>
                  </Form.Group>
                </Col>
                <Col md={12} className="mb-3">
                  <Form.Group>
                    <Form.Label className="small fw-bold">Dirección</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Calle Falsa 123"
                      className="rounded-3"
                      onChange={handleChange}
                      name="direccion"
                      value={formData.direccion}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Card>

          <Card className="shadow-sm p-4 border-0 rounded-4">
            <h4 className="fw-bold mb-3">Método de Pago</h4>
            <div className="p-3 bg-light rounded-3 border d-flex align-items-center">
              <Form.Check
                type="radio"
                label="Tarjeta de Crédito / Débito (Webpay)"
                name="paymentMethod"
                defaultChecked
                className="fw-bold"
              />
              <img
                src="https://www.transbank.cl/public/img/logo-webpay.png"
                alt="Webpay"
                height="20"
                className="ms-auto"
              />
            </div>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm p-4 bg-light border-0 rounded-4">
            <h5 className="fw-bold mb-4">Resumen de Compra</h5>
            <div className="mb-3">
              {cart.map((item) => (
                <div
                  key={item.product_id}
                  className="d-flex justify-content-between small mb-2"
                >
                  <span>
                    {item.quantity}x {item.title}
                  </span>
                  <span>
                    ${(item.price * item.quantity).toLocaleString("es-CL")}
                  </span>
                </div>
              ))}
            </div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total:</span>
              <span>${cartTotal.toLocaleString("es-CL")}</span>
            </div>
            <Button
              variant="dark"
              // 🎨 Cambiamos dinámicamente el color según el error
              className={`btn btn-lg w-100 rounded-pill ${isFormInvalid ? "btn-secondary" : "btn-success"}`}
              onClick={handlePayment}
              disabled={isFormInvalid}
            >
              {isCartEmpty
                ? "Tu carrito está vacío"
                : isInfoIncomplete
                  ? "Completa los datos de envío"
                  : "Confirmar y Pagar"}
            </Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
