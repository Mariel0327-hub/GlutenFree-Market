// Url de conexi´on al servidor, antes del deploy colocarla en .env, (secreto del backend)
// VITE_BACKEND_URL = import.meta.env.VITE_NAME

// baseUrl.js
export const baseURL =  import.meta.env.VITE_API_URL || "http://localhost:3000";
//export const baseURL =  'http://localhost:3000'