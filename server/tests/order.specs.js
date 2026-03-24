//TEMPLATE PARA RELLENAR/ MODFICAR

const request = require("supertest");
const server = require("../index");

// formula genérica:
// const {variables deseadas} = await request(server).get('/ruta).send("payload if needed")


// Relacionadas a tipo de instancia (Array, tipos primtivos, etc..)

describe("Operaciones CRUD relacionadsa a registro e incio de sesión", () => {
  it("POST/products status code === 201?", async () => {
    "...";
  });

  //si se usa id que no existe
  it("GET/products/:id status wrong id gives error?", async () => {
    "...";
  });

  it("GET/products status code === 200?", async () => {
    "...";
  });
});
