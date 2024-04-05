const mongoose = require("mongoose");

const orderStatusEnum = [
  "ORDER_PENDING",
  "ORDER_REJECTED",
  "ORDER_APPROVED",
  "ORDER_DELIVERED",
];

const orderSchema = new mongoose.Schema({
  username: String,
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  orderStatus: { type: String, enum: orderStatusEnum },
  totalPrice: Number,
  transactionId: String,
  orderItem: { type: [mongoose.Schema.Types.Mixed], required: true },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }
});

const OrderModel = mongoose.model("Order", orderSchema);

module.exports = OrderModel;
