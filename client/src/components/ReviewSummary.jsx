const ReviewSummary = ({ reviews = [] }) => {
  // 1. Si no hay reseñas aún, mostramos un mensaje amigable en vez de un error
  if (!reviews || reviews.length === 0) {
    return <div className="p-3 text-muted">Cargando resumen de reseñas...</div>;
  }

  // 2. Si llegamos aquí, reviews.length ya es seguro de usar
  const totalReviews = reviews.length;
  const promedio = reviews.reduce((acc, r) => acc + r.rating, 0) / totalReviews;

  return (
    <div className="card shadow-sm p-4 mb-4">
      <h3>Puntuación General: {promedio.toFixed(1)} ⭐</h3>
      <p>Basado en {totalReviews} opiniones de clientes.</p>
    </div>
  );
};

export default ReviewSummary;
