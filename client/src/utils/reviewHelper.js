export const calcularPromedio = (reviews) => {
  if (!reviews || reviews.length === 0) return 0;
  
  const suma = reviews.reduce((acc, curr) => acc + Number(curr.rating), 0);
  return suma / reviews.length;
};