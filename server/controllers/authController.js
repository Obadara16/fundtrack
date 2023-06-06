const mongoose = require("mongoose");
const User = require("../models/authModel");
const bcrypt = require("bcrypt");
const validator = require("validator");
const Verification = require("../models/verificationModel");
const Referral = require("../models/referralModel");
const Transaction = require("../models/transactionModel");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require("../services/email.js");

require("dotenv").config();

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

const createTokens = async (user) => {
  const accessToken = generateAccessToken(user._id);
  const refreshToken = generateRefreshToken(user._id);
  user.refreshToken = refreshToken;
  await user.save();
  return { accessToken, refreshToken };
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Incorrect Email" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: "Incorrect Password" });
    }

    if (!user.isVerified) {
      return res.status(401).json({
        error:
          "Email not verified. Please check your email and click on the verification link to verify your account.",
      });
    }

    const tokens = await createTokens(user);

    const userWithTokens = {
      user: { ...user.toObject(), password: undefined },
      tokens,
    };

    res.status(200).json(userWithTokens);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const refreshTokens = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({ error: "Refresh token is missing" });
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    if (refreshToken !== user.refreshToken) {
      return res.status(401).json({ error: "Tokens do not match" });
    }

    const tokens = await createTokens(user);

    const userWithTokens = {
      user: { ...user.toObject(), password: undefined },
      tokens,
    };

    res.status(200).json(userWithTokens);
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: "Invalid refresh token" });
  }
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, password, referralCode } = req.body;

  try {
    if (!firstName || !lastName || !email || !password) {
      throw new Error("All fields are required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Email is not valid");
    }

    if (!validator.isStrongPassword(password)) {
      throw new Error("Password not strong enough");
    }

    // check if referral code exists and find the user who referred
    let referredBy = null;
    if (referralCode) {
      const referringUser = await User.findOne({ referralCode });
      if (referringUser) {
        referredBy = referringUser._id;
      }
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      // User already exists, request a new OTP
      await requestNewOTP(req, res);
      return; // Exit the controller to prevent further execution
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hash,
      referralCode: uuidv4(),
      referredBy,
    });

    // create a referral entry if there is a referrer
    if (referredBy) {
      await Referral.create({
        referrer: referredBy,
        referredEmail: email,
      });
    }

    // Generate a unique OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save the OTP and the email address in an OTP collection/table
    await Verification.create({ email, otp });

    // Set a timeout to delete the OTP entry after it expires
    const otpExpiresAt = moment().add(15, "minutes");
    setTimeout(async () => {
      await Verification.findOneAndDelete({ email });
    }, moment(otpExpiresAt).diff(moment()));

    // Send a verification email to the user's email address with the OTP
    await sendVerificationEmail(email, otp);

    res.status(200).json({
      message: "An OTP has been sent to your email address",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Verify Email Controller
const verifyEmail = async (req, res) => {
  try {
    const { otp } = req.body;

    if (!otp) {
      throw new Error("OTP is required");
    }

    const otpEntry = await Verification.findOne({ otp });
    if (!otpEntry) {
      throw new Error("Invalid OTP");
    }

    const user = await User.findOneAndUpdate(
      { email: otpEntry.email },
      { isVerified: true },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found");
    }

    // Find the referral associated with the referred user's email
    const referral = await Referral.findOne({ referredEmail: user.email });

    if (referral) {
      // Update the referral object to mark it as successful
      referral.isRewarded = true;
      await referral.save();

      // Award the referral reward to the referrer
      const referrer = await User.findById(referral.referrer);

      if (referrer) {
        const rewardAmount = referral.rewardAmount;
        referrer.walletBalance += rewardAmount;
        await referrer.save();

        // Create a transaction for the referral reward
        const transaction = new Transaction({
          user: referrer.id,
          type: "referral",
          description: `Referral reward for ${user.email}`,
          amount: rewardAmount,
          date: new Date(),
        });
        await transaction.save();
      }
    }

    // Delete the OTP object if it exists
    if (otpEntry) {
      await Verification.findOneAndDelete({ otp });
    }

    res.status(200).json({ message: "Email verified successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const requestNewOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    // Generate a new OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save the new OTP and update the expiry time
    const otpEntry = await Verification.findOneAndUpdate(
      { email },
      { otp, expiresAt: moment().add(15, "minutes") },
      { new: true, upsert: true }
    );

    // Send the verification email with the new OTP
    await sendVerificationEmail(email, otp);

    res.status(200).json({ message: "New OTP sent successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { otp, password } = req.body;

  try {
    if (!otp || !password) {
      throw new Error("All fields are required");
    }

    const user = await User.findOne({ email: req.user.email });
    if (!user) {
      throw new Error("User not found");
    }

    if (user.otp !== otp) {
      throw new Error("Invalid OTP");
    }

    if (user.otpExpiresAt < new Date()) {
      throw new Error("OTP has expired");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user.password = hash;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) {
      throw new Error("Email is required");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found");
    }

    const otp = otpGenerator.generate(6, {
      upperCase: false,
      specialChars: false,
    });

    user.otp = otp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000); // OTP expires in 5 minutes
    await user.save();

    await sendPasswordResetEmail(email, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const changePassword = async (req, res) => {
  try {
    // Get user ID from token in Authorization header
    const userId = req.user._id;

    // Check if old and new passwords are present
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      throw new Error("All fields are required");
    }

    // Check if new password is strong enough
    if (!validator.isStrongPassword(newPassword)) {
      throw new Error("Password not strong enough");
    }

    // Find user by ID and verify old password
    const user = await User.findById(userId).select("+password");
    if (!user) {
      throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      throw new Error("Old password is incorrect");
    }

    // Update user with new password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(newPassword, salt);
    user.password = hash;
    await user.save();

    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  loginUser,
  refreshTokens,
  registerUser,
  verifyEmail,
  resetPassword,
  forgotPassword,
  changePassword,
  requestNewOTP,
};
