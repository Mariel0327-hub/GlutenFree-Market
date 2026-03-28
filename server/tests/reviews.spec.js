//TEMPLATE PARA RELLENAR/ MODFICAR

import request from "supertest";
import app from "../index.js";

// formula genérica:
// const {variables deseadas} = await request(server).get('/ruta).send("payload if needed")

// Relacionadas a tipo de instancia (Array, tipos primtivos, etc..)

describe("Operaciones CRUD relacionadsa a registro e incio de sesión", () => {
  it("GET/review status code === 200?", async () => {
    //Request:
    const { body, statusCode } = await request(app).get("/review").send();
    //Status code:
    const status = statusCode;
    //elemento dentro del request
    const reviews = body;
    //tamaño del Array:
    //const cantidadCafes = cafe.length;

    //revisar statusCode
    expect(status).toBe(200);

    //Doble revisión: es una instancia de tipo array?
    expect(reviews).toBeInstanceOf(Array);
    // Exclusivamente un array? (Object también pasa el test, por tanto aquí se filtra))
    expect(Array.isArray(reviews)).toBe(true);
    
  });

/*   //si se usa id que no existe
  it("POST/review/:id status wrong id gives error?", async () => {
    crear un review
  });

  it("DELETE/review status code === 200?", async () => {
    borrar un review
  }); */
});
