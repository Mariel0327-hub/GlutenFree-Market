import React, { useContext, useState } from "react";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { OrderContext } from "../context/OrderContext";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";

export default function Checkout() {
  const { cart, cartTotal, shippingCost, FREE_SHIPPING_THRESHOLD, clearCart } = useContext(CartContext);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

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

  const handleCheckout = () => {
    // 1. Creamos el objeto de la nueva orden
    const newOrder = {
      order_id: `ORD-00${(user?.orders?.length || 0) + 1}`, // Genera ORD-004, ORD-005...
      date: new Date().toISOString().split("T")[0], // Fecha de hoy
      subtotal: cartTotal,
      shipping_cost: shippingCost,
      total: cartTotal + shippingCost,
      status: "En proceso", // Estado inicial
      items: cart.map((item) => ({
        product_id: item.product_id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
    };

    // 2. Actualizamos al usuario con su nueva orden
    const updatedUser = {
      ...user,
      orders: [newOrder, ...(user?.orders || [])], // Ponemos la nueva orden al principio
    };

    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser)); // Persistencia

    // 3. Limpiamos carrito y feedback
    clearCart();
    Swal.fire("¡Compra Exitosa!", "Tu pedido está en camino", "success");
    navigate("/mis-pedidos");
  };
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
            <div className="d-flex justify-content-between small mb-1">
              <span>Subtotal:</span>
              <span>${cartTotal.toLocaleString("es-CL")}</span>
            </div>
            <div className="d-flex justify-content-between small mb-2">
              <span>Envío:</span>
              <span>{shippingCost === 0 ? "Gratis" : `$${shippingCost.toLocaleString("es-CL")}`}</span>
            </div>
            {cartTotal < FREE_SHIPPING_THRESHOLD && (
              <div className="text-success small mb-2">
                Te faltan ${Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0).toLocaleString("es-CL")} para envío gratis.
              </div>
            )}
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total:</span>
              <span>${(cartTotal + shippingCost).toLocaleString("es-CL")}</span>
            </div>
            <Button
              variant="dark"
              // 🎨 Cambiamos dinámicamente el color según el error
              className={`btn btn-lg w-100 rounded-pill ${isFormInvalid ? "btn-secondary" : "btn-success"}`}
              onClick={ handleCheckout}
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
