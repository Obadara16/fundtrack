const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const authSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: false,
    },
    firstName: {
      type: String,
      required: false,
    },
    gender: {
      type: String,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    walletBalance: {
      balance: {
        type: Number,
        default: 0,
      },
      paystackRef: {
        type: String,
        default: undefined,
      },
    },
    balance: {
      type: Number,
      default: 0,
    },
    referralCode: {
      type: String,
      unique: true,
    },
    referredBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    img: {
      type: String,
    },
    resetToken: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", authSchema);
