const User = require("../model/User");
const bcrypt = require("bcrypt");
const mailSender = require("../utils/MailSender");

exports.resetPasswordToken = async (req, res) => {
  try {
    const email = req.body.email;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "your email id not registered with us",
        success: false,
      });
    }

    const token = crypto.randomUUID();

    const newUser = await User.findOneAndUpdate(
      { email: email },
      {
        token: token,
        resetPasswordExpired: Date.now() + 5 * 60 * 1000,
      },
      { new: true }
    );

    const url = `https://prajapatishop.netlify.app/update-password/${token}`;

    await mailSender(
      email,
      "password reset link",
      `<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Forgot Password - Shopping Portal</title>
          <style>
              /* Reset CSS */
              body, h1, p {
                  margin: 0;
                  padding: 0;
              }
      
              /* Responsive styles */
              @media only screen and (max-width: 600px) {
                  .container {
                      width: 100% !important;
                  }
              }
      
              /* General styles */
              .container {
                  max-width: 600px;
                  margin: 0 auto;
                  padding: 20px;
                  background-color: #f9f9f9;
                  border-radius: 10px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              }
      
              .logo {
                  text-align: center;
                  margin-bottom: 20px;
              }
      
              .logo img {
                  max-width: 150px;
              }
      
              .message {
                  text-align: center;
                  font-size: 18px;
                  color: #333;
                  margin-bottom: 20px;
              }
      
              .cta-button {
                  display: block;
                  width: 200px;
                  margin: 0 auto;
                  padding: 10px 20px;
                  background-color: #4CAF50;
                  color: #fff;
                  text-align: center;
                  text-decoration: none;
                  border-radius: 5px;
                  font-size: 16px;
              }
      
              .footer {
                  text-align: center;
                  font-size: 14px;
                  color: #999;
                  margin-top: 20px;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <div class="logo">
              <img src="https://img.freepik.com/free-photo/shopping-cart-3d-render-icon_460848-6902.jpg?t=st=1710936038~exp=1710939638~hmac=072b39c53f21622d4ec5fe2bea65e669ea119f8c0b38471bb91dec9d19b7fd71&w=740" alt="Shopping Poring Logo">
              </div>
              <div class="message">
                  <p>Hello,</p>
                  <p>We received a request to reset your password for your Shopping Portal account.</p>
              </div>
              <a href="${url}" class="cta-button">Reset Password</a>
              <div class="footer">
                  If you didn't request a password reset, you can safely ignore this email.
                  <br>
                  This email was sent by Shopping Portal. Please do not reply to this email.
              </div>
          </div>
      </body>
      </html>
      `
    );

    return res.json({
      success: true,
      message:
        "email sent successfully , please check your mail and change password ",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: " something went wrong sending  email , please try again ",
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { password, conformPassword, token } = req.body;

    if (password !== conformPassword) {
      res.json({
        success: false,
        message: "password not matched",
      });
    }

    const user = await User.findOne({ token: token });

    if (!user) {
      return res.json({
        message: "token is missing",
      });
    }

    if (user.resetPasswordExpired < Date.now()) {
      return res.json({
        success: false,
        message: "token is expired please regenerate new token  ",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await User.findOneAndUpdate(
      { token: token },
      {
        password: hashPassword,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "password reset successfully...",
    });
  } catch (error) {
    console.log(error);

    res.status(400).json({
      success: true,
      message: " issue with  reset password ...",
    });
  }
};
