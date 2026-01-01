const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");

const {
  createOrder,
  getMyOrders,
  getOrderById,
} = require("../Controllers/orderController");

router.post("/", auth, createOrder);
router.get("/", auth, getMyOrders);
router.get("/:id", auth, getOrderById);

module.exports = router;
