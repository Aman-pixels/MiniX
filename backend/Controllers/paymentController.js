const PaymentMethod = require("../Models/PaymentMethod");
const asyncHandler = require("../Middleware/asyncHandler");

// Initialize Stripe conditionally to prevent server crash if key is missing
let stripe;
if (process.env.STRIPE_SECRET_KEY) {
    stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
} else {
    console.warn("⚠️ STRIPE_SECRET_KEY is missing in .env. Payment features will fail.");
}

// @desc    Create Payment Intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
exports.createPaymentIntent = asyncHandler(async (req, res) => {
    // CONDITIONAL: If Stripe keys are missing, switch to MOCK MODE
    if (!stripe) {
        console.warn("⚠️ Using Mock Payment Mode (Stripe not configured)");
        return res.json({
            success: true,
            clientSecret: "mock_secret_key_12345",
            mode: "mock",
        });
    }

    const { amount, currency = "usd" } = req.body;

    if (!amount) {
        res.status(400);
        throw new Error("Amount is required");
    }

    const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Stripe expects cents
        currency,
        automatic_payment_methods: {
            enabled: true,
        },
    });

    res.json({
        success: true,
        clientSecret: paymentIntent.client_secret,
    });
});


// @desc    Get all payment methods
// @route   GET /api/payments
// @access  Private
exports.getPaymentMethods = asyncHandler(async (req, res) => {
    const methods = await PaymentMethod.find({ user: req.user.id }).sort({
        createdAt: -1,
    });
    res.json({ success: true, methods });
});

// @desc    Add a payment method
// @route   POST /api/payments
// @access  Private
exports.addPaymentMethod = asyncHandler(async (req, res) => {
    const { type, isDefault, cardName, last4, expiry, upiId } = req.body;

    if (type === "card") {
        if (!cardName || !last4 || !expiry) {
            res.status(400);
            throw new Error("Missing card details");
        }
    } else if (type === "upi") {
        if (!upiId) {
            res.status(400);
            throw new Error("Missing UPI ID");
        }
    } else {
        res.status(400);
        throw new Error("Invalid payment method type");
    }

    const method = await PaymentMethod.create({
        user: req.user.id,
        type,
        isDefault: isDefault || false,
        cardName,
        last4,
        expiry,
        upiId,
    });

    // Because of the pre-save hook, we might want to re-fetch if we ensure consistency,
    // but usually for UI updates, returning the new one + separate fetch is fine.
    // Or we just return all methods again to be safe.
    const methods = await PaymentMethod.find({ user: req.user.id }).sort({
        createdAt: -1,
    });

    res.status(201).json({ success: true, methods });
});

// @desc    Delete a payment method
// @route   DELETE /api/payments/:id
// @access  Private
exports.deletePaymentMethod = asyncHandler(async (req, res) => {
    const method = await PaymentMethod.findById(req.params.id);

    if (!method) {
        res.status(404);
        throw new Error("Payment method not found");
    }

    if (method.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }

    await method.deleteOne();

    const methods = await PaymentMethod.find({ user: req.user.id }).sort({
        createdAt: -1,
    });

    res.json({ success: true, methods });
});

// @desc    Set default payment method
// @route   PUT /api/payments/:id/default
// @access  Private
exports.setDefaultPaymentMethod = asyncHandler(async (req, res) => {
    const method = await PaymentMethod.findById(req.params.id);

    if (!method) {
        res.status(404);
        throw new Error("Payment method not found");
    }

    if (method.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("Not authorized");
    }

    method.isDefault = true;
    await method.save(); // Hook handles unsetting others

    const methods = await PaymentMethod.find({ user: req.user.id }).sort({
        createdAt: -1,
    });

    res.json({ success: true, methods });
});
