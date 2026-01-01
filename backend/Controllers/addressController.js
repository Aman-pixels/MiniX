const Address = require("../Models/Address");

/**
 * Add new address
 */
exports.addAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const { isDefault } = req.body;

    // If new address is default, unset previous default
    if (isDefault) {
      await Address.updateMany(
        { userId, isDefault: true },
        { isDefault: false }
      );
    }

    const address = await Address.create({
      userId,
      ...req.body,
    });

    res.status(201).json({
      message: "Address added successfully",
      address,
    });
  } catch (error) {
    console.error("Add address error:", error);
    res.status(500).json({ message: "Failed to add address" });
  }
};

/**
 * Get all active addresses for user
 */
exports.getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find({
      userId: req.user.id,
      isActive: true,
    }).sort({ isDefault: -1, createdAt: -1 });

    res.json({ addresses });
  } catch (error) {
    console.error("Get addresses error:", error);
    res.status(500).json({ message: "Failed to fetch addresses" });
  }
};

/**
 * Update address
 */
exports.updateAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;
    const { isDefault } = req.body;

    const address = await Address.findOne({
      _id: addressId,
      userId,
      isActive: true,
    });

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // Handle default switch
    if (isDefault) {
      await Address.updateMany(
        { userId, isDefault: true },
        { isDefault: false }
      );
    }

    Object.assign(address, req.body);
    await address.save();

    res.json({
      message: "Address updated successfully",
      address,
    });
  } catch (error) {
    console.error("Update address error:", error);
    res.status(500).json({ message: "Failed to update address" });
  }
};

/**
 * Set default address
 */
exports.setDefaultAddress = async (req, res) => {
  try {
    const userId = req.user.id;
    const addressId = req.params.id;

    await Address.updateMany(
      { userId, isDefault: true },
      { isDefault: false }
    );

    const address = await Address.findOneAndUpdate(
      { _id: addressId, userId, isActive: true },
      { isDefault: true },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json({
      message: "Default address updated",
      address,
    });
  } catch (error) {
    console.error("Set default address error:", error);
    res.status(500).json({ message: "Failed to set default address" });
  }
};

/**
 * Soft delete address
 */
exports.deleteAddress = async (req, res) => {
  try {
    const address = await Address.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { isActive: false },
      { new: true }
    );

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    res.json({ message: "Address removed successfully" });
  } catch (error) {
    console.error("Delete address error:", error);
    res.status(500).json({ message: "Failed to remove address" });
  }
};
