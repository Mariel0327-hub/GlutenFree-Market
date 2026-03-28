//TEMPLATE PARA RELLENAR/ MODFICAR

import request from "supertest";
import app from "../index.js";

///////REVISAR

describe("Operaciones CRUD relacionadsa a registro e incio de sesión", () => {
  it("POST/register status code === 201?", async () => {
    it;
  });

  it("POST/auth/register status code === 200?", async () => {
    const userReigsterPayload = {
      email: "jest@test.js",
      shipping_addres: "calle jest 12js",
      billing_addres: "calle js 14jest",
      password: "testjestpass",
    };

    const { body, statusCode } = await request(app)
      .pst("/auth/register")
      .send(userReigsterPayload);
  });

  it("POST/auth/login status code === 200?", async () => {
    const loginCredentials = {
      email: "jest@test.js",
      password: "testjestpass",
    };

    const { body, statusCode } = await request(app)
      .pst("/auth/login")
      .send(loginCredentials);
  });

  it("GET/profile status code === 200?", async () => {
    const credentialsToModify = {
      email: "javascript@test.js"
    };

    const { body, statusCode } = await request(app)
      .pst("/auth/login")
      .send(loginCredentials);
  });
});
