const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      trim: true,
      minLength: [3, "Product name must have at least 3 characters"],
      maxLength: [100, "Product name cannot exceed 100 characters"],
    },

    price: {
      type: Number,
      required: [true, "A product must have a price"],
      default: 0.0,
    },

    description: {
      type: String,
      trim: true,
      required: [true, "A product must have a description"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],

    category: {
      type: String,
      required: [true, "Product must have a category"],
      enum: {
        values: [
          "Electronics",
          "Cameras",
          "Laptops",
          "Accessories",
          "Headphones",
          "Food",
          "Books",
          "Cloths/Shoes",
          "Beauty/Health",
          "Sports",
          "Outdoor",
          "Home",
        ],
        message: "Please add a category",
      },
    },

    seller: {
      type: String,
      required: [true, "A product must have a seller"],
    },
    stock: {
      type: Number,
      required: [true, "Please enter product stock"],
      maxLength: [5, "Product name cannot exceed 5 characters"],
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
