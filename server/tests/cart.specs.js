//TEMPLATE PARA RELLENAR/ MODFICAR

const request = require("supertest");
const server = require("../index");

// formula genérica:
// const {variables deseadas} = await request(server).get('/ruta).send("payload if needed")

describe("Operaciones CRUD relacionadsa a registro e incio de sesión", () => {
  it("POST/register status code === 201?", async () => {
    "...";
  });

  it("POST/login status code === 200?", async () => {
    "...";
  });

  it("GET/profile status code === 200?", async () => {
    "...";
  });
});
