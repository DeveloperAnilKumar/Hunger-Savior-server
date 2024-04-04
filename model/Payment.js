const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    paymentStatus: {
        type:String,
        enum:["PAYMENT_SUCCESS","REFUND_COMPLETED"]
    }, 
    txnDateAndTime: Date,
    username: String,
    transactionId: String,
    totalPrice:Number
});

const PaymentModel = mongoose.model('Payment', paymentSchema);

module.exports = PaymentModel;
