const mongoose = require("mongoose")


const userScheme = new mongoose.Schema({

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
    ,
    role: {
        type: String,
        enum: ['ADMIN', "USER"],
        required: true
    },
    token: {
        type: String,
    },
    resetPasswordExpired: {
        type: Date

    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    updatedAt: {
        type: Date,

    }

})

module.exports = mongoose.model("User", userScheme)