// Importamos dotenv para leer el .env
import dotenv from "dotenv";

// Importamos la app ya configurada
import app from "./app.js";

// Activamos dotenv
dotenv.config();

// Tomamos el puerto del .env o usamos 3000
const PORT = process.env.PORT || 3000;

// Levantamos el servidor
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});