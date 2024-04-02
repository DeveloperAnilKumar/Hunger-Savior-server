const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  restaurantName: {
    type: String,
    required: true,
  },
  rating: String,
  imageUrl: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  menuTypes: {
    type: [String],
    required: true,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: "At least one menu type is required",
    },
  },
  restaurantMenu: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RestaurantMenu",
    },
  ],
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
