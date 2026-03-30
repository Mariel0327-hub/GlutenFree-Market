import request from "supertest";
import app from "../index.js";

ADMIN_USERNAME = process.env.ADMIN_USERNAME;
ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
ADMIN_ROLE = process.env.ADMIN_ROLE;

describe("Operaciones CRUD relacionadsa al tratamiento de carritos", () => {
  it("POST/cart/ status code === 201?", async () => {
    //Admin verification:
    //get admin permission:
    const { body: adminBody } = await request(app)
      .post("/auth/admin")
      .send({ user: ADMIN_USERNAME, pass: ADMIN_PASSWORD });

    //USER REGISTER
    //Comment this method to test an existing user's cart creation/deleting

    const customerReigsterPayload = {
      email: "sipilino@test.js",
      shipping_address: "calle jest 12js",
      billing_address: "calle js 14jest",
      password: "testjestpass",
    };

    const { body: newUserBody, statusCode: registerStatus } = await request(app)
      .post("/auth/register")
      .send(customerReigsterPayload);

    //LOGIN
    const logInPayload = {
      email: "sipilino@test.js",
      password: "testjestpass",
    };
    //USER LOGIN
    const { body: loginBody, statusCode: loginStatus } = await request(app)
      .post("/auth/login")
      .send(logInPayload);

    console.log("login: ", loginBody);

    //USER CREATE A CART
    const { body: cartBody, statusCode: cartStatus } = await request(app)
      .post("/cart")
      .set("Authorization", `Bearer ${loginBody.token}`);

    console.log("cart: ", cartBody);

    //ADMIN DELETE THE CART
    const { body: deleteCartBody, statusCode: deleteCartStatus } =
      await request(app)
        .delete(`/cart/${cartBody.cart_id}`)
        .set("Authorization", `Bearer ${adminBody.adminToken}`);

    //DELETE PROFILE

    const { body: deleteProfileBody, statusCode: deleteProfileStatus } =
      await request(app)
        .delete(`/auth/profile`)
        .set("Authorization", `Bearer ${loginBody.token}`);

    expect(cartStatus).toBe(201);
  });

  it("POST/cart/proudct state = 201", async () => {
    //Admin verification:
    //get admin permission:
    const { body: adminBody } = await request(app)
      .post("/auth/admin")
      .send({ user: ADMIN_USERNAME, pass: ADMIN_PASSWORD });

    //USER REGISTER
    //Comment this method to test an existing user's cart creation/deleting

    const customerReigsterPayload = {
      email: "sipilino@test.js",
      shipping_address: "calle jest 12js",
      billing_address: "calle js 14jest",
      password: "testjestpass",
    };

    const { body: newUserBody, statusCode: registerStatus } = await request(app)
      .post("/auth/register")
      .send(customerReigsterPayload);

    //LOGIN
    const logInPayload = {
      email: "sipilino@test.js",
      password: "testjestpass",
    };
    //USER LOGIN
    const { body: loginBody, statusCode: loginStatus } = await request(app)
      .post("/auth/login")
      .send(logInPayload);

    //console.log("login: ", loginBody);

    //USER CREATE A CART
    const { body: cartBody, statusCode: cartStatus } = await request(app)
      .post("/cart")
      .set("Authorization", `Bearer ${loginBody.token}`);

    //console.log("cart: ", cartBody);

    //ADD PRODUCT TO THE CART:
    const cartProudctPayload = {
      newCartProduct: {
        id_product: "prod-001",
        id_cart: `${cartBody.cart_id}`,
        quantity: 5,
      },
    };

    //console.log('id: ', cartBody.cart_id);

    //USER CREATE A CART
    const { body: cartProductBody, statusCode: cartProdcutStatus } =
      await request(app)
        .post("/cart/product")
        .set("Authorization", `Bearer ${loginBody.token}`)
        .send(cartProudctPayload);

    //ADMIN DELETE THE CART
    const { body: deleteCartBody, statusCode: deleteCartStatus } =
      await request(app)
        .delete(`/cart/${cartBody.cart_id}`)
        .set("Authorization", `Bearer ${adminBody.adminToken}`);

    //DELETE PROFILE

    const { body: deleteProfileBody, statusCode: deleteProfileStatus } =
      await request(app)
        .delete(`/auth/profile`)
        .set("Authorization", `Bearer ${loginBody.token}`);

    expect(cartProdcutStatus).toBe(201);
  });
});
