import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { UserContext } from "../context/UserContext";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../utils/baseUrl.js";

export default function Checkout() {
  const { cart, cartTotal, shippingCost, setCart } = useContext(CartContext);
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();

  const handlePay = async () => {
    if (cart.length === 0) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const orderData = {
        items: cart, //  productos
        total: totalGeneral, // El total calculado
        shipping_address: formData.direccion, // La dirección que escribió el usuario
      };

      const res = await axios.post(
        `${baseURL}/api/order`,
        orderData,
        config
      );
      console.log("PAGO EXITOSO:", res.data);
      console.log("Estructura exacta de la respuesta:", res.data);
      if (res.status === 201 || res.status === 200) {
        const orderId = res.data?.order_total_id;

        await Swal.fire({
          icon: "success",
          title: "¡Pago Exitoso!",
          text: "Tu pedido ha sido procesado correctamente.",
          timer: 2000,
          showConfirmButton: false,
        });

        setCart([]);
        navigate("/success", { state: { orderNumber: orderId } });
      }
    } catch (error) {
      console.error("Error en el pago:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "No pudimos procesar tu pago.",
      });
    }
  };
  const [formData, setFormData] = useState({
    nombre: user?.customer_name || "",
    telefono: user?.phone || "",
    direccion: user?.shipping_address || "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalGeneral = (Number(cartTotal) || 0) + (Number(shippingCost) || 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    handlePay();
  };

  return (
    <Container className="py-5">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={8}>
            <Card className="p-4 shadow-sm border-0 rounded-4">
              <h4 className="fw-bold mb-4">Información de Envío</h4>
              {/* Aquí van tus inputs de nombre, dirección, etc (sin cambios) */}
              <Col md={8}>
                <Card className="p-4 shadow-sm border-0 rounded-4 mb-4">
                  <Row>
                    <Col md={6} className="mb-3">
                      <Form.Label className="small fw-bold">
                        Nombre Completo
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="nombre"
                        placeholder="Ej: Juan Pérez"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        className="rounded-3"
                      />
                    </Col>
                    <Col md={6} className="mb-3">
                      <Form.Label className="small fw-bold">
                        Teléfono
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="telefono"
                        placeholder="+56 9 1234 5678"
                        value={formData.telefono}
                        onChange={handleInputChange}
                        className="rounded-3"
                      />
                    </Col>
                  </Row>

                  <Form.Group className="mb-4">
                    <Form.Label className="small fw-bold">
                      Dirección de Entrega
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="direccion"
                      placeholder="Calle, Número, Departamento, Comuna"
                      value={formData.direccion}
                      onChange={handleInputChange}
                      className="rounded-3"
                    />
                  </Form.Group>

                  <h4 className="fw-bold mb-4 mt-2">Método de Pago</h4>
                  <Card className="p-3 border rounded-3 bg-white">
                    <Form.Check
                      type="radio"
                      label="Tarjeta de Crédito / Débito (Webpay)"
                      name="paymentMethod"
                      id="webpay"
                      defaultChecked
                      className="fw-medium"
                    />
                  </Card>
                </Card>
              </Col>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="p-4 bg-light border-0 rounded-4 shadow-sm">
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
                    {/* ✅ Multiplicación protegida */}
                    <span>
                      $
                      {(Number(item.price || 0) * item.quantity).toLocaleString(
                        "es-CL",
                      )}
                    </span>
                  </div>
                ))}
              </div>

              <hr />
              <div className="d-flex justify-content-between mb-1">
                <span>Subtotal:</span>
                <span>${cartTotal.toLocaleString("es-CL")}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Envío:</span>
                <span>${shippingCost.toLocaleString("es-CL")}</span>
              </div>
              <div className="d-flex justify-content-between fw-bold fs-4">
                <span>Total:</span>
                <span>${totalGeneral.toLocaleString("es-CL")}</span>
              </div>

              <Button
                type="sub"
                variant="dark"
                className="w-100 mt-4 rounded-pill py-2"
                disabled={cart.length === 0}
              >
                {cart.length === 0 ? "Carrito Vacío" : "Confirmar y Pagar"}
              </Button>
            </Card>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
