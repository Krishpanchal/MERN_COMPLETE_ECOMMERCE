const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Order = require("../models/orderModel");
const Product = require("../models/productModel");

// Create order = /api/v1/orders
exports.createOrder = catchAsync(async (req, res, next) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(200).json({
    success: true,
    order,
  });
});

// Get order = /api/v1/orders/:id
exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return next(new AppError("No order found with id " + req.params.id));
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// Get My order = /api/v1/orders/me
exports.getMyOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });

  if (!orders) {
    return next(new AppError("No orders found for user " + req.user.id));
  }

  res.status(200).json({
    success: true,
    results: orders.length,
    orders,
  });
});

// Get All order = /api/v1/orders
exports.getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Order.find().populate("user", "name email");

  if (!orders) {
    return next(new AppError("No orders found"));
  }

  let totalOrdersAmount = 0;

  orders.forEach((order) => {
    totalOrdersAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalOrdersAmount,
    results: orders.length,
    orders,
  });

  // let totalOrdersAmount = 0;

  // order.forEach
});

// Update Order status = /api/v1/orders/:id
exports.updateOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (order.orderStatus === "Delivered") {
    return next(new AppError("You have already delivered this order", 400));
  }

  // Update the item stock
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  //Update order status
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") order.deliveredAt = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
  });
});

const updateStock = async (id, quantity) => {
  const product = await Product.findById(id);

  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
};

// Delete order = /api/v1/orders/:id
exports.deleteOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);

  if (!order) {
    return next(new AppError("No order found with id " + req.params.id, 400));
  }

  res.status(201).json({
    success: true,
  });
});
