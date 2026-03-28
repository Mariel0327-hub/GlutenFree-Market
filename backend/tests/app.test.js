// Importamos supertest para probar la API
import request from "supertest";

// Importamos la app sin levantar puerto
import app from "../app.js";

// Grupo de pruebas de la API
describe("Pruebas básicas de la API Gluten Free Market", () => {
  // ================================
  // TEST 1: Ruta base
  // ================================
  test("GET / debe responder 200", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe("Backend Gluten Free Market funcionando");
  });

  // ================================
  // TEST 2: Health check
  // ================================
  test("GET /api/health debe responder 200", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
  });

  // ================================
  // TEST 3: Productos
  // ================================
  test("GET /api/productos debe responder 200 y devolver arreglo", async () => {
    const response = await request(app).get("/api/productos");

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(Array.isArray(response.body.productos)).toBe(true);
  });

  // ================================
  // TEST 4: Categorías
  // ================================
  test("GET /api/categorias debe responder 200 y devolver arreglo", async () => {
    const response = await request(app).get("/api/categorias");

    expect(response.statusCode).toBe(200);
    expect(response.body.ok).toBe(true);
    expect(Array.isArray(response.body.categorias)).toBe(true);
  });

  // ================================
  // TEST 5: Ruta protegida sin token
  // ================================
  test("GET /api/perfil sin token debe responder 401", async () => {
    const response = await request(app).get("/api/perfil");

    expect(response.statusCode).toBe(401);
    expect(response.body.ok).toBe(false);
  });
});