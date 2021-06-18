const express = require("express");
const cookieParser = require("cookie-parser");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/orders", orderRoutes);

app.use(globalErrorHandler);

module.exports = app;
