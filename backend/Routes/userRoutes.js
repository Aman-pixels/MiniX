const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const {
  getProfile,
  updateProfile,
  updatePassword,
} = require("../Controllers/userController");

router.get("/me", auth, getProfile);
router.put("/update", auth, updateProfile);
router.put("/update-password", auth, updatePassword);

module.exports = router;
