const express = require("express");
const router = express.Router();

const { register, login, me, logout } = require("../Controllers/authController");
const { protect } = require("../Middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.post("/logout", protect, logout);

module.exports = router;
