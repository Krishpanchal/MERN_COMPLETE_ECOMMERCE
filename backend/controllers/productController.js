const mongoose = require("mongoose");
const Product = require("../models/productModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(201).json({
    success: true,
    product,
  });
});

exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({});

  if (!products) {
    return next(new AppError("No Product found", 404));
  }

  res.status(200).json({
    success: true,
    results: products.length,
    products,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No Product found with id " + req.params.id, 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No Product found with id " + req.params.id, 404));
  }

  res.status(200).json({
    success: true,
    product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No Product found with that ID", 404));
  }

  res.status(204).json({
    success: true,
    data: null,
  });
});
