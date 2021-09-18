const mongoose = require("mongoose");

const cartSchema = mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
      required: [true, "Cart must belong to a product"],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Cart must belong to a User"],
    },
    totalQuantity: {
      type: Number,
    },
    totalPrice: {
      type: Number,
      required: [true, "Cart product must have a product totalPrice"],
    },
  },
  {
    timestamps: true,
  }
);

cartSchema.pre(/^find/, function (next) {
  this.populate("user", "name email").populate(
    "product",
    "price stock name images"
  );
  next();
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
