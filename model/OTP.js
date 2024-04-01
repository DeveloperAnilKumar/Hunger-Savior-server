const mongoose = require("mongoose");
const mailSender = require("../utils/MailSender");

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expire: 5 * 60,
  },
});

async function sendVerificationEmail(email, otp) {
  const emailContect = `<!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Hunger Savior - Email Verification</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f8f8f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }
    h1 {
      color: #333;
      text-align: center;
      margin-bottom: 20px;
    }
    p {
      color: #666;
      line-height: 1.6;
      margin-bottom: 20px;
    }
    .otp {
      text-align: center;
      font-size: 32px;
      font-weight: bold;
      color: #007bff;
      margin-bottom: 30px;
    }
    .btn-container {
      text-align: center;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
      transition: background-color 0.3s ease;
    }
    .btn:hover {
      background-color: #0056b3;
    }
    .timer {
      text-align: center;
      font-size: 14px;
      color: #666;
    }
  </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Hunger Savior!</h1>
      <p>Hi there,</p>
      <p>Thank you for signing up with Hunger Savior! To complete your registration, please use the OTP (One-Time Password) provided below:</p>
      <p class="otp">${otp}</p>
      <p>If you didn't request this verification, you can ignore this email. Your account is still safe.</p>
      <p>Please use the OTP within the next 5 minutes. After that, it will expire for security reasons.</p>
      <p>We're excited to have you on board! If you have any questions or need assistance, feel free to contact us.</p>
      <div class="btn-container">
        <a href="#" class="btn">Visit Hunger Savior</a>
      </div>
      <p>Best regards,<br>The Hunger Savior Team</p>
    </div>
  </body>
  </html>
  
  
    `;

  try {
    const response = await mailSender(
      email,
      " Otp  Verification ",
      emailContect
    );
  } catch (error) {
    console.log(error);
    console.log("issue with email sending");
  }
}

otpSchema.pre("save", async function (next) {
  await sendVerificationEmail(this.email, this.otp);
  next();
});

module.exports = mongoose.model("OTP", otpSchema);
