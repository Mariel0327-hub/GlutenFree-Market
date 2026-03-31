import request from "supertest";
import app from "../index.js";

describe("Operaciones CRUD relacionadsa a registro e incio de sesión", () => {
  it("GET/products status code === 200?", async () => {
    
    const { body, statusCode } = await request(app).get("/products").send();

    expect(statusCode).toBe(200);

    expect(body).toBeInstanceOf(Array);
    expect(Array.isArray(body)).toBe(true);
  });

  it("GET/products/filter?<query> // testing a query", async () => {
    const queryString = "?limit=10&order_by=price_ASC";

    const { body, statusCode } = await request(app)
      .get("/products/filter")
      .query(queryString);

    expect(statusCode).toBe(200);
    expect(body).toBeInstanceOf(Array);
    expect(Array.isArray(body)).toBe(true);
  });
});
