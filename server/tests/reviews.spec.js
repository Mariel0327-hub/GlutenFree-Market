//TEMPLATE PARA RELLENAR/ MODFICAR

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
/* 

//buscar un usuario existente o registrar uno
  it("DELETE/review status code === 200?", async () => {
    //LOGIN
    const logInPayload = {
      email: "sipilino@test.js",
      password: "testjestpass",
    };

    const { body: loginBody, statusCode: loginStatus } = await request(app)
      .post("/auth/login")
      .send(logInPayload);

    const reviewPayload = {
      about_product: true,
      id_product: "prod-001",
      review_body: "Es lo mejor que me pasó en la vida",
      rating: 5,
    };

    //POST de un review:
    const { body: postBody, statusCode: postStatus } = await request(app)
      .post("/review")
      .set("Authorization", `Bearer ${loginBody.token}`)
      .send(reviewPayload);

    //Request a testear:
    const { body: deleteBody, statusCode: deletedStatus } = await request(app)
      .delete(`/review/${reviewPayload.id}`)
      .set("Authorization", `Bearer ${loginBody.token}`)
      .send();

    //revisar statusCode
    expect(deletedStatus).toBe(200);
  }); */
});
