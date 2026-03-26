//TEMPLATE PARA RELLENAR/ MODFICAR

import request from "supertest";
import app from "../index.js";

// formula genérica:
// const {variables deseadas} = await request(server).get('/ruta).send("payload if needed")

// Relacionadas a tipo de instancia (Array, tipos primtivos, etc..)

describe("Operaciones CRUD relacionadsa a registro e incio de sesión", () => {
  it("GET/order status code === 200?", async () => {
    //Request:
    const { body, statusCode } = await request(app).get("/order").send();
    //Status code:
    const status = statusCode;
    //elemento dentro del request
    const cart = body;
    //tamaño del Array:
    //const cantidadCafes = cafe.length;

    //revisar statusCode
    expect(status).toBe(200);

    //Doble revisión: es una instancia de tipo array?
    expect(cart).toBeInstanceOf(Array);
    // Exclusivamente un array? (Object también pasa el test, por tanto aquí se filtra))
    expect(Array.isArray(cart)).toBe(true);

/*     //Desde que el length no sea 0, el test pasa.
    expect(cantidadCafes).not.toBe(0); */
  });

/*   //si se usa id que no existe
  it("GET/products/:id status wrong id gives error?", async () => {
    "...";
  });

  it("GET/products status code === 200?", async () => {
    "...";
  }); */
});
