const express = require("express");

const productRoutes = require("./routes/productRoutes");
const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.use(express.json());

app.use("/api/v1/products", productRoutes);

app.use(globalErrorHandler);

module.exports = app;
