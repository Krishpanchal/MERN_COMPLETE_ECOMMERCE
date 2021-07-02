const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const cloudinary = require("cloudinary");
const createSendToken = require("../utils/createSendToken");
const AppError = require("../utils/appError");
const Cart = require("../models/cartModel");

//  Get User Profile ==> /api/v1/users/me
exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

//  Update / Change user password ==> /api/v1/users/updateMyPassword
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");

  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    return next(new AppError("Please provide all the fields", 401));
  }

  if (!(await user.correctPassword(currentPassword, user.password))) {
    return next(new AppError("Please provide correct current password", 401));
  }

  user.password = newPassword;
  await user.save();

  createSendToken(user, 200, res);
});

// Update User Profile ==> /api/v1/users/updateMe
exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  if (req.body.avatar) {
    console.log("Avatar there");
    if (req.user.avatar.public_id !== req.body.avatar.public_id) {
      console.log("No new avatar there");

      const image_id = req.user.avatar.public_id;
      const res = await cloudinary.v2.uploader.destroy(image_id);

      const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 150,
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }
  }

  const updatedUser = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: {
      user: updatedUser,
    },
  });
});

/****** ADMIN ROUTES ******/

// Get All Users ==> /api/v1/users/
exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find().populate("cartItems");

  if (!users) {
    return next(new AppError("No users found"));
  }

  res.status(200).json({
    success: true,
    results: users.length,
    users,
  });
});

// Get a user ==> /api/v1/users/:id (GET)

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("cartItems");

  if (!user) {
    return next(new AppError(`No user found with id: ${req.params.id}`));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// Update a user ==> /api/v1/users/:id (PATCH)

exports.updateUser = catchAsync(async (req, res, next) => {
  if (req.body.password) {
    return next(new AppError("Admin cannot update user's password", 400));
  }

  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: reqy.body.role,
  };

  const updatedUser = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: {
      user: updatedUser,
    },
  });
});

// Delete a user ==> /api/v1/users/:id (Delete)

exports.deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);

  if (!user) {
    return next(new AppError("No document found with that ID", 404));
  }

  await Cart.deleteMany({ user: req.params.id });

  res.status(204).json({
    success: true,
    data: null,
  });
});
