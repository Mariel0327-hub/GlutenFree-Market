import request from "supertest";
import app from "../index.js";

ADMIN_USERNAME = process.env.ADMIN_USERNAME;
ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
ADMIN_ROLE = process.env.ADMIN_ROLE;

describe("Operaciones CRUD relacionadsa a registro e incio de sesión", () => {
  it("GET/order status code === 200?", async () => {
    //Request sin verificación de administrador
    const { body, statusCode } = await request(app).get("/order").send();

    expect(statusCode).toBe(401);
  });

  //si se usa id que no existe
  it("GET/order/:id status wrong id gives error even when verified?", async () => {
    const wrongId = "cust-99999999999999999999999999999";

    //Admin verification:
    //get admin permission:
    const { body: adminBody } = await request(app)
      .post("/auth/admin")
      .send({ user: ADMIN_USERNAME, pass: ADMIN_PASSWORD });

    //Request:
    const { body, statusCode } = await request(app)
      .get(`/order/${wrongId}`)
      .set("Authorization", `Bearer ${adminBody.adminToken}`)
      .send();

    //revisar statusCode
    expect(statusCode).toBe(404);
  });
});
