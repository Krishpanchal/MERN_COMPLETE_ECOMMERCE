const express = require("express");
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const auth = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(getAllProducts)
  .post(auth.protect, auth.restrictTo("admin"), createProduct);

router
  .route("/:id")
  .get(getProduct)
  .patch(auth.protect, auth.restrictTo("admin"), updateProduct)
  .delete(auth.protect, auth.restrictTo("admin"), deleteProduct);

module.exports = router;
