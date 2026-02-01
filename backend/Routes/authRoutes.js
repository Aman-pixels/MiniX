const express = require("express");
const router = express.Router();

const { register, login, me, logout, forgotPassword, resetPassword } = require("../Controllers/authController");
const { protect } = require("../Middleware/authMiddleware");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);
router.post("/logout", protect, logout);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);

module.exports = router;
