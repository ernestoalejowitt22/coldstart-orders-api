const request = require("supertest");
const app = require("../app");

test("creates and reads back an order", async () => {
  const created = await request(app).post("/orders").send({ productId: 123 });
  expect(created.status).toBe(201);
  expect(created.body.status).toBe("confirmed");

  const read = await request(app).get(`/orders/${created.body.id}`);
  expect(read.status).toBe(200);
  expect(read.body.productId).toBe(123);
});

test("rejects an order without a productId", async () => {
  const res = await request(app).post("/orders").send({});
  expect(res.status).toBe(400);
});
