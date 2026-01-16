const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

// ROUTES
const authRoutes = require("./Routes/authRoutes");
const userRoutes = require("./Routes/userRoutes");
const addressRoutes = require("./Routes/addressRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const productRoutes = require("./Routes/productRoutes");
const cartRoutes = require("./Routes/cartRoutes");
const wishlistRoutes = require("./Routes/wishlistRoutes");
const adminRoutes = require("./Routes/adminRoutes"); // Added adminRoutes import
const { errorHandler } = require("./Middleware/errorMiddleware");

// INIT APP (THIS MUST COME FIRST)
const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ROUTE MOUNTS (AFTER app IS CREATED)
const orderRoutes = require("./Routes/orderRoutes");
const paymentRoutes = require("./Routes/paymentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin", adminRoutes); // Added adminRoutes usage
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// ERROR HANDLER (Last middleware)
app.use(errorHandler);

// DB + SERVER
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
