import request from "supertest";
import app from "../index.js";

describe("Operaciones CRUD relacionadsa a registro e incio de sesión", () => {
  it("GET/review status code === 200?", async () => {
    //Request:
    const { body: reviewBody, statusCode: reviewStatus } = await request(app)
      .get("/review")
      .send();

    //revisar statusCode
    expect(reviewStatus).toBe(200);

    //Doble revisión: es una instancia de tipo array?
    expect(reviewBody).toBeInstanceOf(Array);
    // Exclusivamente un array? (Object también pasa el test, por tanto aquí se filtra))
    expect(Array.isArray(reviewBody)).toBe(true);
  });

  it("GET/review status code === 200?", async () => {
    const wrongId = "this is not an id";
    //Request:
    const { body: reviewBody, statusCode: reviewStatus } = await request(app)
      .get(`/review/${wrongId}`)
      .send();

    //revisar statusCode
    expect(reviewStatus).toBe(404);
  });
});
