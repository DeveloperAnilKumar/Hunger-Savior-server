const mongoose = require("mongoose")


const cartScheme = new mongoose.Schema({
    quantity: {
        type: Number,
        default:1,
        min:1,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    restaurantMenu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "RestaurantMenu",
        required: true
    }

})

module.exports = mongoose.model("Cart", cartScheme)