//PENDIENTE DE IMPLEMENTAR

const databaseError = {
  23505: {
    code: 409,
    message: "Usuario ya reistrado",
  },
  "42P01": {
    code: 500,
    message: "Tabla no definida",
  },
  //'23502'
};

export const getDatabaseError = (code) => {
  return databaseError[code] || { code: 500, message: "Internal server error" };
};
