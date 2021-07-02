const express = require("express");
const {
  addToCartController,
  getAllCartItems,
  getMyCartItems,
  updateMyCartItem,
  deleteMyCartItem,
} = require("../controllers/cartController");
const router = express.Router();
const auth = require("../middlewares/auth");

router.use(auth.protect);
// Add to cart
router.post("/:productId", addToCartController);

// Get all user's cartItems Items
router.get("/", auth.restrictTo("admin"), getAllCartItems);

// Get a user's/my cartItem
router.get("/me", getMyCartItems);

// Update and delete Cart Items
router
  .route("/me/:cartProductId")
  .patch(updateMyCartItem)
  .delete(deleteMyCartItem);

module.exports = router;
