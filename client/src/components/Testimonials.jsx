// 1. Importa el ProductContext (o como se llame donde guardas tus productos)
import { ProductContext } from "../context/ProductContext";
import React, { useContext } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ReviewContext } from "../context/ReviewContext";
import Swal from "sweetalert2";

export default function Testimonials() {
  const { myReviews, token, deleteReview, updateReview } =
    useContext(ReviewContext);
  const { products } = useContext(ProductContext);
  // Cargando catálogo
  if (!products || products.length === 0) {
    return (
      <Container className="py-5">
        <p>Cargando catálogo...</p>
      </Container>
    );
  }

  // Función para manejar la edición
  const handleEdit = async (rev) => {
    const { value: text } = await Swal.fire({
      title: "Editar comentario",
      input: "textarea",
      inputLabel: "Edita tu opinión",
      inputValue: rev.review_body,
      showCancelButton: true,
      confirmButtonText: "Guardar cambios",
      cancelButtonText: "Cancelar",
    });

    if (text !== undefined && text !== rev.review_body) {
      const updatedData = {
        review_body: text,
        rating: rev.rating,
        review_title: rev.review_title,
        about_product: rev.about_product,
        id_product: rev.id_product,
      };

      try {
        await updateReview(rev.review_id, updatedData, token);

        Swal.fire({
          icon: "success",
          title: "¡Actualizado!",
          text: "Tu reseña se ha modificado correctamente.",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        Swal.fire("Error", "No se pudo actualizar la reseña", error);
      }
    }
  };
  // Función para manejar la eliminación
  const handleDelete = (reviewId) => {
    Swal.fire({
      title: "¿Eliminar reseña?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await deleteReview(reviewId, token);

          if (res.success) {
            Swal.fire({
              icon: "success",
              title: "Eliminado",
              text: "La reseña ha sido borrada.",
              timer: 1500,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          Swal.fire("Error", "Hubo un problema al eliminar la reseña", error);
        }
      }
    });
  };

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Mis Testimonios</h2>
      {myReviews.length === 0 ? (
        <p>Aún no tienes reseñas publicadas.</p>
      ) : (
        <Row className="g-4">
          {myReviews.map((rev) => {
            const productData = products.find(
              (p) =>
                String(p.product_id).trim().toLowerCase() ===
                String(rev.id_product).trim().toLowerCase(),
            );

            return (
              <Col key={rev.review_id} xs={12} md={6}>
                <Card className="shadow-sm border-0 rounded-4 p-3 h-100">
                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2 text-warning">
                      {"★".repeat(rev.rating)}
                    </div>

                    <h6 className="text-muted fw-bold mb-2">
                      Sobre:{" "}
                      {productData
                        ? productData.title
                        : "Producto de la tienda"}
                    </h6>

                    <p className="text-muted fst-italic mt-2 flex-grow-1">
                      "{rev.review_body}"
                    </p>

                    <div className="d-flex justify-content-end mt-3">
                      <Button
                        variant="link"
                        className="p-0 me-3 text-decoration-none shadow-none d-flex align-items-center"
                        onClick={() => handleEdit(rev)}
                      >
                        <i className="fas fa-edit me-1"></i>
                        <span style={{ fontSize: "0.85rem" }}>Editar</span>
                      </Button>

                      <Button
                        variant="link"
                        className="p-0 text-decoration-none shadow-none text-danger d-flex align-items-center"
                        onClick={() => handleDelete(rev.review_id)}
                      >
                        <i className="fas fa-trash-alt me-1"></i>
                        <span style={{ fontSize: "0.85rem" }}>Eliminar</span>
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}
