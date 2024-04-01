const OTP = require("../model/OTP");
const User = require("../model/User");
const Otp = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateOTP = () => {
  return Otp.generate(6, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "all fields required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        message: "email already registered",
        success: false,
      });
    }

    let otp = generateOTP();

    while (await OTP.findOne({ otp })) {
      otp = generateOTP();
    }

    await OTP.create({ email, otp });

    res.status(201).json({
      message: "OTP sent successfully",
      success: true,
      otp,
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, conformPassword, role, otp } =
      req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !conformPassword ||
      !role ||
      !otp
    ) {
      return res.status(400).json({
        message: "all fields required",
        success: false,
      });
    }

    if (password !== conformPassword) {
      return res.status(400).json({
        message: "passwords do not match",
        success: false,
      });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        message: "user already exists",
        success: false,
      });
    }

    const otpRecord = await OTP.findOne({ email, otp });
    if (!otpRecord) {
      return res.status(400).json({
        message: "invalid OTP",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      firstName,
      lastName,
      email,
      image: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName} ${lastName}`,
      password: hashedPassword,
      role: role.toUpperCase(),
    });

    res.status(201).json({
      message: "account created successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        message: "all filed required",
        success: false,
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "user not registered please signup",
        success: false,
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({
        message: "password incorrect ",
        success: false,
      });
    }

    const payload = {
      email: user.email,
      id: user._id,
      role: user.role,
    };

    const token = await jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: "24d",
    });

    user.token = token;
    user.password = undefined;

    const option = {
      expire: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true,
    };

    res.cookie("token", token, option).status(200).json({
      token,
      user,
      message: "login successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(201).json({
      message: error.message,
      success: false,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    if (!email || !newPassword) {
      return res.status(400).json({
        message: "all filed required",
        success: false,
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "user not found",
        success: false,
      });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate({ _id: user._id }, { password: hashPassword });

    res.status(200).json({
      message: "password updated successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);

    res.status(201).json({
      message: error.message,
      success: false,
    });
  }
};

exports.logout = async (req, res) => {
  res.cookie("token", "", {
    maxAge: 0,
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

exports.getTotalUsers = async (req, res) => {
  try {
    const totalUserCount = await User.countDocuments({ role: "USER" });

    res.status(200).json({
      success: true,
      totalUserCount: totalUserCount,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
      success: false,
    });
  }
};
