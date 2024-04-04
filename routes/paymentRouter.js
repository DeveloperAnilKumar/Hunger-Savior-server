const express = require("express");
const paymentRouter = express.Router();
const paymentController = require("../controller/paymentController");

paymentRouter.post("/payments", paymentController.createPayment);


module.exports = paymentRouter;
