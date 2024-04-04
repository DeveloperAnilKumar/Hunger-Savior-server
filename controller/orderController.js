// routes/orders.js

const Order = require("../model/Order");

exports.createOrder = async (req, res) => {
  try {
    const { username, orderStatus, totalPrice, transactionId, orderItem } =
      req.body;
    const newOrder = new Order({
      username,
      orderStatus,
      totalPrice,
      transactionId,
      orderItem,
    });
   

    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

