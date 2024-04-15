const mongoose = require("mongoose");

const restaurantMenuSchema = new mongoose.Schema({
  menuItem: {
    type: String,
    required: true,
  },
  menuItemPrice: {
    type: String,
    required: true,
  },
  menuImageUrl: {
    type: String,
    required: true,
  },
  menuType: {
    type: String,
  },
  description: {
    type: String,
  },
  menuItemPrice: {
    type: Number,
    required: true,
    min: 0,
  },
  quantity: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("RestaurantMenu", restaurantMenuSchema);
