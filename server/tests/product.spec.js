//TEMPLATE PARA RELLENAR/ MODFICAR

import request from "supertest";
import app from "../index.js";

// formula genérica:
// const {variables deseadas} = await request(server).get('/ruta).send("payload if needed")

// Relacionadas a tipo de instancia (Array, tipos primtivos, etc..)

describe("Operaciones CRUD relacionadsa a registro e incio de sesión", () => {
  it("GET/products status code === 200?", async () => {
    //Request:
    const { body, statusCode } = await request(app).get("/products").send();
    //Status code:
    const status = statusCode;
    //elemento dentro del request
    const products = body;
    //tamaño del Array:
    //const cantidadCafes = cafe.length;

    //revisar statusCode
    expect(status).toBe(200);

    //Doble revisión: es una instancia de tipo array?
    expect(products).toBeInstanceOf(Array);
    // Exclusivamente un array? (Object también pasa el test, por tanto aquí se filtra))
    expect(Array.isArray(products)).toBe(true);
  });

  //si se usa id que no existe
  it("GET/products/filter?<query> // testing a query", async () => {
    
    const queryString = "?limit=10&order_by=price_ASC";
    
    const { body, statusCode } = await request(app)
      .get("/products/filter")
      .query(queryString);

    expect(statusCode).toBe(200);

    //Doble revisión: es una instancia de tipo array?
    expect(body).toBeInstanceOf(Array);
    // Exclusivamente un array? (Object también pasa el test, por tanto aquí se filtra))
    expect(Array.isArray(body)).toBe(true);
  });

  /*  
  it("GET/profile status code === 200?", async () => {
      - reciribir token de usuario (login)
      - hacer request para ver perfil
  }); */
});
