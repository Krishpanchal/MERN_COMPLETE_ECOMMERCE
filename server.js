const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = require("./app");
const cloudinary = require("cloudinary");

const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log("Unhandled Exception 💥 Shutting Down");
  console.log(err.name, err.message, err.stack);
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((con) => console.log("Database connection successful!"));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server is up on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection 💥 Shutting Down");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
