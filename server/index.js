const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const transactionRoutes = require("./routes/transaction");
const paymentRoutes = require("./routes/payment");
const walletRoutes = require("./routes/wallet");
const userRoutes = require("./routes/user");
const cors = require("cors");

//Use express
const app = express();

// Middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.use("/uploads", express.static("uploads"));

const allowedOrigins = [
  "https://afrimart.onrender.com",
  "https://afrimart-backend.onrender.com/api/",
  "http://localhost:3000",
  "http://localhost:5000",
];
app.use(
  cors({
    origin: function (origin, callback) {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

// Strict
mongoose.set("strictQuery", true);

// Connect Database
// Connect Database
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Server Running and Database Connected");
    });
  })
  .catch((err) => {
    console.log(err);
  });

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/users", userRoutes);
