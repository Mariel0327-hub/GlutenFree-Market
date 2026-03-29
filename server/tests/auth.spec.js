//TEMPLATE PARA RELLENAR/ MODFICAR
import request from "supertest";
import app from "../index.js";
import "dotenv/config";

ADMIN_USERNAME = process.env.ADMIN_USERNAME;
ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
ADMIN_ROLE = process.env.ADMIN_ROLE;

///////REVISAR

describe("Operaciones CRUD relacionadsa a registro e incio de sesión", () => {
  it("POST/auth/admin status code === 200 and token existence?", async () => {
    const { body: adminUser, statusCode: adminStatus } = await request(app)
      .post("/auth/admin")
      .send({ user: ADMIN_USERNAME, pass: ADMIN_PASSWORD });

    //status
    expect(adminStatus).toBe(200);
    //somethin is returned
    expect(adminUser.adminToken).toBeDefined();
  });

  it("POST/auth/register status code === 201 and payLoad type = Object?", async () => {
    //REGISTER
    const customerReigsterPayload = {
      email: "sipilino@test.js",
      shipping_address: "calle jest 12js",
      billing_address: "calle js 14jest",
      password: "testjestpass",
    };

    console.log("pero que es esto?");

    const { body: newUserBody, statusCode: registerStatus } = await request(app)
      .post("/auth/register")
      .send(customerReigsterPayload);

    expect(registerStatus).toBe(201);
    expect(newUserBody).toBeInstanceOf(Object);
  });

  it("POST/auth/login status code === 200 and token existence?", async () => {
    //Payload
    const logInPayload = {
      email: "sipilino@test.js",
      password: "testjestpass",
    };

    //Login
    const { body: loginBody, statusCode: loginStatus } = await request(app)
      .post("/auth/login")
      .send(logInPayload);

    //Revisar statusCode
    expect(loginStatus).toBe(200);
    //Doble revisión: es una instancia de tipo Object?
    expect(loginBody).toBeInstanceOf(Object);
    // Testear que el token esté definido
    expect(loginBody.token).toBeDefined();
  });

  it("DELETE/auth/profiel status code === 201 and payLoad type = Object?", async () => {
    //DELETE REGISTERED USER WITHIN THE DESCRIBE
    //LOGIN
    const logInPayload = {
      email: "sipilino@test.js",
      password: "testjestpass",
    };

    const { body: loginBody, statusCode: loginStatus } = await request(app)
      .post("/auth/login")
      .send(logInPayload);

    //Get profile to obtain the customer_id
    const { body: profileBody, statusCode: profileStatus } = await request(app)
      .get("/auth/profile")
      .set("Authorization", `Bearer ${loginBody.token}`);

    //console.log('cliente:', profileBody.customer_id)
    //console.log('cliente-token: ', loginBody.token)
    //const customer_id = profileBody.customer_id;
    //console.log("customer_id = ", customer_id);

    //get admin permission:
    const { body: adminBody } = await request(app)
      .post("/auth/admin")
      .send({ user: ADMIN_USERNAME, pass: ADMIN_PASSWORD });

    //Delete after create to not overpopulate:
    const { body: deleteBody, statusCode: deleteStatus } = await request(app)
      .delete(`/auth/profile/${profileBody.customer_id}`)
      .set("Authorization", `Bearer ${adminBody.adminToken}`);

    //console.log("delete body: ", deleteBody);
    //console.log("delete status:", deleteStatus.customer_id);

    expect(deleteStatus).toBe(200);
  });
});
