const express = require("express");
const databasesConnection = require("./config/database");
const cloudinary = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");

const cors = require("cors");
var morgan = require("morgan");
const restaurantRouter = require("./routes/restaurantRouter");
const cartRouter = require("./routes/cartRouter");
const paymentRouter = require("./routes/paymentRouter");
const orderRouter = require("./routes/orderRouter");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(cors());

app.use(morgan("tiny"));

databasesConnection();

cloudinary();

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/", restaurantRouter);
app.use("/api/v1/", cartRouter);
app.use("/api/v1/", paymentRouter);
app.use("/api/v1/", orderRouter);

app.get("/", (req, res) => {
  res.send("<h1> welcome to hunger saviour  </h1>");
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port no ${process.env.PORT}`);
});
