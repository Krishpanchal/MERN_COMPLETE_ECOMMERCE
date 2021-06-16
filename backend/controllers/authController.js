const crypto = require("crypto");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const createSendToken = require("../utils/createSendToken");
const sendEmail = require("../utils/sendEmail");

// Signup user => /api/v1/users/signup
exports.signup = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    return next(new AppError("User with email already exists", 400));
  }

  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    avatar: {
      public_id: "products/camera_ridc0i",
      url: "https://res.cloudinary.com/bookit/image/upload/v1606231283/products/camera_ridc0i.jpg",
    },
  });

  createSendToken(newUser, 201, res);
});

// Login user => /api/v1/users/login

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Please provide email and password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  createSendToken(user, 200, res);
});

// Logout user => /api/v1/users/logout
exports.logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now() - 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ success: true });
};

// Forgot Password => /api/v1/users/forgotPassword
exports.forgotPassword = catchAsync(async (req, res, next) => {
  //Get the posted email
  if (!req.body.email) {
    return next(new AppError("Please provide your email", 400));
  }

  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new AppError("Email could not be sent", 404));
  }

  //Generate the random reset token
  const resetToken = user.createPasswordResetToken();

  //Save the passwordTokens fields in the database
  await user.save({ validateBeforeSave: false });

  //Send it to the user's email
  try {
    const resetURL = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;

    const message = `Your password reset link is here: ${resetURL}`;

    await sendEmail({
      to: user.email,
      subject:
        "ShoiIt | Your password reset Token ( valid for only 10 minutes )",
      message,
    });

    res.status(200).json({
      satus: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new AppError("Email could not be sent. Try again later", 500));
  }
});

// Reset Password => /api/v1/users/reset/:token
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    next(new AppError("Token is invalid or expired"));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new AppError("Passwords do not match"));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  createSendToken(user, 200, res);
});
