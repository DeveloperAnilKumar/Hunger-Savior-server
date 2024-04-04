const Payment = require('../model/Payment');
const Razorpay = require('razorpay');
const crypto = require('crypto');

exports.createPayment = async (req, res) => {
    try {
        const { paymentStatus, txnDateAndTime, username, transactionId ,totalPrice } = req.body;
        const newPayment = new Payment({
            paymentStatus,
            txnDateAndTime,
            username,
            transactionId,
            totalPrice
        });

        await newPayment.save();
        res.status(201).json(newPayment);
    } catch (error) {
        console.error('Error creating payment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

