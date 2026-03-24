const databaseError = {
  23505: {
    code: 409,
    message: "Usuario ya reistrado",
  },
  "42P01": {
    code: 500,
    message: "Tabla no definida",
  },
};

export const getDatabaseError = (code) => {
  return databaseError[code] || { code: 500, message: "Internal server error" };
};
