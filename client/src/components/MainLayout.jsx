import React from "react";
import { ToastContainer, Toast } from "react-bootstrap";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import "../assets/css/MainLayout.css";
import { CartContext } from "../context/CartContext";

export default function MainLayout() {
  const { showToast, setShowToast, lastAdded } = useContext(CartContext);

  return (
    <ToastContainer
      position="bottom-end"
      className="p-3"
      style={{ zIndex: 9999 }}
    >
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        className="border-0 shadow-lg rounded-4"
      >
        <Toast.Header
          style={{ backgroundColor: "#7c5c4c" }}
          className="text-white rounded-top-4 border-0"
        >
          <strong className="me-auto">🛒 ¡Añadido!</strong>
        </Toast.Header>
        <Toast.Body className="bg-white rounded-bottom-4 p-3">
          {lastAdded && (
            <div className="d-flex align-items-center">
              <img
                src={lastAdded.image_url}
                width="50"
                className="rounded-3 me-3"
                alt={lastAdded.title}
                onError={(e) => {
                  e.target.src =
                    "https://images.unsplash.com/photo-1723910065922-67b84af65b23?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
                }}
              />
              <div>
                <div className="fw-bold text-dark">{lastAdded.title}</div>
                <small className="text-muted">Se agregó correctamente</small>
              </div>
            </div>
          )}
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
