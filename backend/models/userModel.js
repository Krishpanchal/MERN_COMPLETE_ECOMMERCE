const mongoose = require("mongoose");
const Validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "A user must jave a name"],
      minlength: [3, "User name must have atleast 3 characters"],
      maxlength: [30, "User name must have atmost 30 characters"],
    },
    email: {
      type: String,
      required: [true, "A user must have a email"],
      unique: true,
      validate: [Validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      minlength: [6, "A user password must have at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },

    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    passwordResetToken: String,
    passwordResetExpires: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  }
);

userSchema.virtual("cartItems", {
  ref: "Cart",
  foreignField: "user",
  localField: "_id",
});

// Encrypt Password before save
userSchema.pre("save", async function (next) {
  //Only run this function if password is modified
  if (!this.isModified("password")) return next();

  //Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 10);

  next();
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

userSchema.methods.correctPassword = function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
