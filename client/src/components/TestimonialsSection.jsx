import React, { useContext, useState } from "react";
import { ReviewContext } from "../context/ReviewContext";
import { UserContext } from "../context/UserContext";
import { FaStar } from "react-icons/fa";
import Swal from "sweetalert2";

export default function TestimonialsSection({ productId, canReview }) {
  const { user } = useContext(UserContext);
  const { reviews, addReview } = useContext(ReviewContext);

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const productReviews = reviews.filter(
    (r) => String(r.product_id) === String(productId),
  );
  const userAlreadyReviewed = productReviews.some(
    (r) => r.author === user?.name,
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      alert("Por favor, selecciona una puntuación y escribe un comentario.");
      return;
    }

    addReview({
      product_id: productId,
      author: user.name,
      rating: rating,
      comment: comment,
      date: new Date().toLocaleDateString(),
    });

    setComment("");
    setRating(0);
    Swal.fire({
      icon: "success",
      title: "¡Reseña publicada!",
      text: "Gracias por compartir tu experiencia con nosotros.",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  return (
    <div className="mt-5 pt-5 border-top">
      <h3 className="titles-font fw-bold mb-4">
        Experiencias de nuestros clientes
      </h3>

      {/* --- BLOQUE DE FORMULARIO O MENSAJES --- */}
      <div className="review-permission-box mb-5">
        {!user ? (
          <div className="p-4 bg-light rounded-4 text-center border">
            <p className="mb-0 text-muted small">
              Inicia sesión para compartir tu opinión.
            </p>
          </div>
        ) : userAlreadyReviewed ? (
          <div className="p-4 bg-success-subtle rounded-4 text-center border border-success-primary shadow-sm">
            <p className="mb-0 text-success fw-bold">
              ¡Gracias por tu reseña! Ya hemos registrado tu opinión sobre este
              producto.
            </p>
            <small className="text-muted">
              Pronto podrás editarla desde tu perfil.
            </small>
          </div>
        ) : canReview ? (
          <div className="p-4 bg-white shadow-sm rounded-4 border border-success-subtle">
            <h5 className="fw-bold mb-3 text-success">
              ¡Tu opinión nos importa!
            </h5>
            <div className="mb-3">
              {[...Array(5)].map((_, index) => {
                const val = index + 1;
                return (
                  <FaStar
                    key={index}
                    size={25}
                    className="me-1"
                    style={{ cursor: "pointer", transition: "color 200ms" }}
                    color={val <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                    onClick={() => setRating(val)}
                    onMouseEnter={() => setHover(val)}
                    onMouseLeave={() => setHover(0)}
                  />
                );
              })}
            </div>
            <form onSubmit={handleSubmit}>
              <textarea
                className="form-control mb-3"
                placeholder="¿Qué te parecieron las Gummies?"
                rows="3"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                type="submit"
                className="btn btn-dark rounded-pill px-4 fw-bold"
              >
                Publicar reseña
              </button>
            </form>
          </div>
        ) : (
          <div className="p-4 bg-warning-subtle rounded-4 text-center border border-warning-subtle">
            <p className="mb-0 text-dark small">
              Solo compradores verificados pueden comentar.
            </p>
          </div>
        )}
      </div>

      {/* --- LISTADO DE RESEÑAS CON ESTRELLAS Y DISEÑO --- */}
      <div className="mt-4">
        <h5 className="fw-bold mb-4">
          Reseñas de este producto ({productReviews.length})
        </h5>
        <div className="row g-3">
          {productReviews.length > 0 ? (
            productReviews.map((rev) => (
              <div key={rev.review_id} className="col-md-6">
                <div className="card h-100 border-0 shadow-sm rounded-4 p-3 bg-white">
                  <div className="card-body p-2">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <span className="fw-bold text-dark small">
                        {rev.author}
                      </span>
                      <span
                        className="text-muted"
                        style={{ fontSize: "0.75rem" }}
                      >
                        {rev.date}
                      </span>
                    </div>
                    <div className="mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          size={14}
                          color={i < rev.rating ? "#ffc107" : "#e4e5e9"}
                          className="me-1"
                        />
                      ))}
                    </div>
                    <p className="card-text text-secondary small italic mb-0">
                      "{rev.comment}"
                    </p>
                    <div className="mt-2">
                      <span
                        className="badge bg-light text-success fw-normal border"
                        style={{ fontSize: "0.65rem" }}
                      >
                        Comprador Verificado ✅
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className=" fst-italic">Aún no hay reseñas. ¡Sé el primero!</p>
          )}
        </div>
      </div>
    </div>
  );
}
