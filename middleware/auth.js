const jwt = require("jsonwebtoken");

exports.auth = (req, res, next) => {
  try {
    const token =
      req.body.token ||
      req.cookies.token ||
      req.header("Authorization").replace("Bearer ", "");

    if (!token) {
      return res.status(400).json({
        message: "token not found",
        success: false,
      });
    }

    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
      res.status(400).json({
        message: "invalid token",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

exports.isUser = (req, res, next) => {
  try {
    if (req.user.role !== "USER") {
      return res.status(400).json({
        message: "this is protected route for user only",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role !== "ADMIN") {
      return res.status(400).json({
        message: "this is protected route for admin only",
        success: false,
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: error.message,
      success: false,
    });
  }
};
