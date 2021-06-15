const dotenv = require("dotenv");
const mongoose = require("mongoose");

const products = require("../data/productData.json");
const Product = require("../models/productModel");

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("Database connection successful!"));

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Product deleted successfully");

    await Product.insertMany(products);
    console.log("Product inserted successfully");
  } catch (err) {
    console.log(err.message);
  }
};

seedProducts();
