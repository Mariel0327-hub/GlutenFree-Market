import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { testimonials as initialData } from "../data/testimonials";
import axios from "axios";
import Swal from "sweetalert2";

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
  const { user, token } = useContext(UserContext);
  const [reviews, setReviews] = useState([]);

  const myReviews = reviews.filter((r) => {
    // 1. Buscamos el ID del usuario logueado en sus dos posibles nombres
    const currentUserId = user?.customer_id || user?.id;

    // 2. Buscamos el ID del autor en la reseña
    const reviewAuthorId = r.id_customer;

    // 3. Comparamos transformando ambos a String para evitar errores
    return (
      reviewAuthorId &&
      currentUserId &&
      String(reviewAuthorId) === String(currentUserId)
    );
  });
  const canUserReview = (userId, productId, userOrders) => {
    if (!userId || !userOrders) return false;

    // 1. ¿El usuario compró este producto alguna vez?
    const hasBought = userOrders.some((order) =>
      order.items?.some(
        (item) => String(item.product_id) === String(productId),
      ),
    );

    // 2. ¿El usuario YA calificó este producto?
    // Buscamos en el estado global de 'reviews'
    const alreadyReviewed = reviews.some(
      (r) =>
        String(r.id_customer) === String(userId) &&
        String(r.id_product) === String(productId),
    );

    // Puede reseñar SI lo compró Y NO lo ha reseñado
    return hasBought && !alreadyReviewed;
  };
  const addReview = async (newReview, token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.post(
        "http://localhost:3000/api/review",
        newReview,
        config,
      );

      if (res.status === 201 || res.status === 200) {
        const savedReview = {
          ...res.data,
          id_customer: user?.customer_id || user?.id,
        };

        setReviews((prev) => [...prev, savedReview]);
        return { success: true };
      }
    } catch (error) {
      console.error("Error al guardar review en DB:", error);
      return { success: false, error };
    }
  };
  useEffect(() => {
    const loadReviews = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/review"); // Tu ruta de GET
        setReviews(res.data);
      } catch (error) {
        console.error("Error cargando reseñas desde Neon:", error);
      }
    };
    loadReviews();
  }, []);

  const deleteReview = async (reviewId, token) => {
    console.log("Intentando eliminar la reseña con ID:", reviewId);

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const res = await axios.delete(
        `http://localhost:3000/api/review/${reviewId}`,
        config,
      );

      if (res.status === 200 || res.status === 204) {
        setReviews((prev) => prev.filter((r) => r.review_id !== reviewId));
        return { success: true };
      }
    } catch (error) {
      console.error(
        "Error al eliminar en el servidor:",
        error.response?.data || error.message,
      );
      return { success: false };
    }
  };

  const updateReview = async (reviewId, updatedData, token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      // La URL según tu backend es /api/review/reviews/:id
      const res = await axios.put(
        `http://localhost:3000/api/review/reviews/${reviewId}`,
        updatedData,
        config,
      );
      if (res.status === 200) {
        setReviews((prev) =>
          prev.map((r) =>
            r.review_id === reviewId ? { ...r, ...updatedData } : r,
          ),
        );
      }
    } catch (error) {
      console.error("Error al editar:", error);
    }
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
