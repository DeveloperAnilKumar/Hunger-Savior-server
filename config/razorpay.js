const Razorpay = require('razorpay')

require("dotenv").config()

exports.instance = new Razorpay({
    key_id:  process.env.RAZEORPAY_KEY,
    key_secret: process.env.RAZEORPAY_SECRET,
});