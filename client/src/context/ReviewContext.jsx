import React, { createContext, useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { testimonials as initialData } from "../data/testimonials";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [reviews, setReviews] = useState(initialData);

  //  Eliminar: Filtra por ID
  const deleteReview = (id) => {
    setReviews(reviews.filter((r) => r.review_id !== id));
  };

  //Editar: Actualiza el cuerpo de la reseña
  const updateReview = (id, updatedBody, updatedRating) => {
    setReviews(
      reviews.map((r) =>
        r.review_id === id
          ? { ...r, review_body: updatedBody, rating: updatedRating }
          : r,
      ),
    );
  };

  //  Filtrar: Solo las reseñas del usuario actual
  // Usamos el email o el nombre para el mock
  const myReviews = reviews.filter(
    (r) => r.author === user?.name || r.customer_id === user?.id,
  );

  // Supongamos que tienes acceso a los pedidos (orders) desde otro contexto o un mock
  const canUserReview = (userId, productId, userOrders) => {
    if (!userId) return false; // Si no está logueado, no puede

    // Verificamos si existe algún pedido que contenga este producto y esté pagado/entregado
    return userOrders.some(
      (order) =>
        order.customer_id === userId &&
        order.items.some((item) => item.product_id === productId),
    );
  };

  const addReview = (newReview) => {
    // Generamos un ID único simple para la nueva reseña
    const reviewWithId = {
      ...newReview,
      review_id: Date.now(),
      review_body: newReview.comment,
    };

    setReviews((prevReviews) => [reviewWithId, ...prevReviews]);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        myReviews,
        deleteReview,
        updateReview,
        canUserReview,
        addReview,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
