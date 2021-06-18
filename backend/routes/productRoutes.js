const express = require("express");
const productController = require("../controllers/productController");
const auth = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    auth.protect,
    auth.restrictTo("admin"),
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(
    auth.protect,
    auth.restrictTo("admin"),
    productController.updateProduct
  )
  .delete(
    auth.protect,
    auth.restrictTo("admin"),
    productController.deleteProduct
  );

router
  .route("/review/:id")
  .get(productController.getProductReview)
  .patch(auth.protect, productController.createProductReview)
  .delete(auth.protect, productController.deleteReview);
module.exports = router;
