const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.addToCartController = catchAsync(async (req, res, next) => {
  // Get the productId and check product
  const product = await Product.findById(req.params.productId);

  if (!req.body.totalQuantity) {
    return next(
      new AppError("A product to be added to cart must have a quantity", 404)
    );
  }

  if (!product) {
    return next(
      new AppError("Product not found with id " + req.params.productId, 404)
    );
  }

  if (req.body.totalQuantity > product.stock) {
    return next(
      new AppError(
        `The product ${product.name} has ${product.stock} items left. Please add a value less than the current product stock`
      )
    );
  }

  const updateCartItem = await Cart.findOne({
    user: req.user.id,
    product: req.params.productId,
  });

  if (updateCartItem) {
    updateCartItem.totalQuantity = req.body.totalQuantity;
    updateCartItem.totalPrice =
      req.body.totalQuantity * updateCartItem.product.price;
    await updateCartItem.save();

    return res.status(200).json({
      success: true,
      cartItem: updateCartItem,
    });
  }

  // create cart Product
  const cartItem = await Cart.create({
    product: req.params.productId,
    user: req.user.id,
    totalQuantity: req.body.totalQuantity,
    totalPrice: product.price * req.body.totalQuantity,
  });

  res.status(201).json({
    success: true,
    cartItem,
  });
});

exports.getAllCartItems = catchAsync(async (req, res, next) => {
  const cartItems = await Cart.find();

  if (!cartItems) return next(new AppError("No cart Items found", 404));

  res.status(200).json({
    success: true,
    results: cartItems.length,
    cartItems,
  });
});

exports.getMyCartItems = catchAsync(async (req, res, next) => {
  const cartItems = await Cart.find({ user: req.user.id });

  if (!cartItems) return next(new AppError("No cart Items found", 404));

  res.status(200).json({
    success: true,
    results: cartItems.length,
    cartItems,
  });
});

exports.updateMyCartItem = catchAsync(async (req, res, next) => {
  //   TODO: the user can only update his cart

  const cartItem = await Cart.findByIdAndUpdate(
    req.params.cartProductId,
    req.body,
    { new: true }
  );

  if (!cartItem) return next(new AppError("No cart Item found", 404));

  res.status(200).json({
    success: true,
    cartItem,
  });
});

exports.deleteMyCartItem = catchAsync(async (req, res, next) => {
  //   TODO: the user can only update his cart

  const cartItem = await Cart.findByIdAndDelete(req.params.cartProductId);

  if (!cartItem) return next(new AppError("No cart Item found", 404));

  res.status(200).json({
    success: true,
  });
});
