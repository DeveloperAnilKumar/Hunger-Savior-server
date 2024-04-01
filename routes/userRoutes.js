const express = require("express")
const {signup, login, sendOtp, logout ,getTotalUsers } = require("../controller/userController");
const {resetPassword, resetPasswordToken} = require("../controller/resetPassword");
const {auth, isUser} = require("../middleware/auth");
const userRouter = express.Router()
const cors = require("cors");
const app = express()

app.use(cors())

userRouter.post("/send-otp", sendOtp)
userRouter.post("/signup", signup)
userRouter.post("/login", login)
userRouter.post("/logout", logout)
userRouter.post("/send-token", resetPasswordToken)
userRouter.post("/reset-password", resetPassword)
userRouter.get("/getUsers", getTotalUsers)




module.exports = userRouter;