// routes/orders.js

const Order = require("../model/Order");

exports.createOrder = async (req, res) => {
  try {
    const { username, orderStatus, totalPrice, transactionId, orderItem , userId } =
      req.body;
    const newOrder = new Order({
      username,
      orderStatus,
      totalPrice,
      transactionId,
      orderItem,
      user:userId
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
    const id = req.params.id
    const orders = await Order.find({user:id});
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error getting orders:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

