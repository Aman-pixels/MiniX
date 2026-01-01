const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");

const {
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} = require("../Controllers/addressController");

/**
 * @route   POST /api/address
 * @desc    Add new address
 * @access  Private
 */
router.post("/", auth, addAddress);

/**
 * @route   GET /api/address
 * @desc    Get all user addresses
 * @access  Private
 */
router.get("/", auth, getAddresses);

/**
 * @route   PUT /api/address/:id
 * @desc    Update address
 * @access  Private
 */
router.put("/:id", auth, updateAddress);

/**
 * @route   PATCH /api/address/:id/default
 * @desc    Set default address
 * @access  Private
 */
router.patch("/:id/default", auth, setDefaultAddress);

/**
 * @route   DELETE /api/address/:id
 * @desc    Soft delete address
 * @access  Private
 */
router.delete("/:id", auth, deleteAddress);

module.exports = router;
