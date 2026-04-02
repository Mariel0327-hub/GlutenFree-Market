import request from "supertest";
import "dotenv/config";
import app from "../index.js";



const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_ROLE = process.env.ADMIN_ROLE;


describe("Operaciones CRUD relacionadsa a registro e incio de sesión", () => {
  it("POST/api/auth/admin status code === 200 and token existence?", async () => {
    const { body: adminUser, statusCode: adminStatus } = await request(app)
      .post("/api/auth/admin")
      .send({ user: ADMIN_USERNAME, pass: ADMIN_PASSWORD });

    //status
    expect(adminStatus).toBe(200);
    //somethin is returned
    expect(adminUser.adminToken).toBeDefined();
  });

  it("POST/api/auth/register status code === 201 and payLoad type = Object?", async () => {
    //REGISTER
    const customerReigsterPayload = {
      customer_name: "Carlos Sipilino",
      email: "sipilino@test.js",
      phone: '23092395',
      shipping_address: "calle jest 12js",
      billing_address: "calle js 14jest",
      customer_password: "testjestpass",
    };

    const { body: newUserBody, statusCode: registerStatus } = await request(app)
      .post("/api/auth/register")
      .send(customerReigsterPayload);

    expect(registerStatus).toBe(201);
    expect(newUserBody).toBeInstanceOf(Object);
  });

  it("POST/api/auth/login status code === 200 and token existence?", async () => {
    //Payload
    const logInPayload = {
      email: "sipilino@test.js",
      customer_password: "testjestpass",
    };

    //Login
    const { body: loginBody, statusCode: loginStatus } = await request(app)
      .post("/api/auth/login")
      .send(logInPayload);

    //Revisar statusCode
    expect(loginStatus).toBe(200);
    //Doble revisión: es una instancia de tipo Object?
    expect(loginBody).toBeInstanceOf(Object);
    // Testear que el token esté definido
    expect(loginBody.token).toBeDefined();
  });

  it("DELETE/api/auth/profile status code === 200", async () => {
    //DELETE REGISTERED USER WITHIN THE DESCRIBE
    //LOGIN
    const logInPayload = {
      email: "sipilino@test.js",
      customer_password: "testjestpass",
    };

    const { body: loginBody, statusCode: loginStatus } = await request(app)
      .post("/api/auth/login")
      .send(logInPayload);

    //Get profile to obtain the customer_id
    const { body: profileBody, statusCode: profileStatus } = await request(app)
      .get("/api/auth/profile")
      .set("Authorization", `Bearer ${loginBody.token}`);

    //console.log('cliente:', profileBody.customer_id)
    //console.log('cliente-token: ', loginBody.token)

    //Eliminar perfil
    const { body: deleteBody, statusCode: deleteStatus } = await request(app)
      .delete(`/api/auth/profile`)
      .set("Authorization", `Bearer ${loginBody.token}`);

    //console.log("delete body: ", deleteBody);
    //console.log("delete status:", deleteStatus.customer_id);

    expect(deleteStatus).toBe(200);
  });
});
