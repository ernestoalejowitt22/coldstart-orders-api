const express = require("express");

const app = express();
app.use(express.json());

const orders = new Map();
let nextId = 1;

app.get("/health", (_req, res) => res.json({ status: "ok" }));

app.post("/orders", (req, res) => {
  const { productId, quantity = 1 } = req.body ?? {};
  if (!Number.isInteger(productId)) {
    return res.status(400).json({ error: "productId must be an integer" });
  }
  const order = { id: nextId++, productId, quantity, status: "confirmed" };
  orders.set(order.id, order);
  res.status(201).json(order);
});

app.get("/orders/:id", (req, res) => {
  const order = orders.get(Number(req.params.id));
  if (!order) return res.status(404).json({ error: "not found" });
  res.json(order);
});

module.exports = app;
