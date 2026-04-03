import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";
import { testimonials as initialData } from "../data/testimonials";
import axios from "axios";
import Swal from "sweetalert2";
import { baseURL } from "../utils/baseUrl.js";

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
        `${baseURL}/api/review`,
        newReview,
        config,
      );
      if (res.status === 201 || res.status === 200) {
        // Usamos .flat() para deshacernos de las capas de arrays extra
        // o simplemente accedemos al primer elemento si viene como [[{...}]]
        const newReviewData = res.data.flat()[0];

        setReviews((prev) => {
          // Aplanamos también el estado anterior por si acaso quedó mal guardado antes
          const currentReviews = prev.flat();
          return [...currentReviews, newReviewData];
        });

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
        const res = await axios.get(`${baseURL}/api/review`); // Tu ruta de GET
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
        `${baseURL}/api/review${reviewId}`,
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
        `${baseURL}/api/reviewreviews/${reviewId}`,
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
        token,
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};
