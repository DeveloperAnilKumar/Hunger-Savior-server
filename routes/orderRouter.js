const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controller/orderController");

orderRouter.post("/order", orderController.createOrder);
orderRouter.get("/orders/:id", orderController.getAllOrders);


module.exports = orderRouter;
