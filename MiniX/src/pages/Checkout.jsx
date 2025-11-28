import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ArrowLeft } from "lucide-react";

export default function Checkout() {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zip: "",
    payment: "cod",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const generateOrderId = () => {
    const t = Date.now().toString(36).toUpperCase();
    const r = Math.floor(1000 + Math.random() * 9000);
    return `MINIX-${t}-${r}`;
  };

  const handleOrder = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.zip
    ) {
      alert("Please fill all details.");
      return;
    }

    const order = {
      orderId: generateOrderId(),
      items: cartItems.map((it) => ({
        id: it.id,
        name: it.name,
        price:
          typeof it.price === "string"
            ? parseFloat(it.price.replace("$", ""))
            : Number(it.price),
        quantity: it.quantity || 1,
        selectedSize: it.selectedSize || null,
        selectedColor: it.selectedColor || null,
        image: it.image || null,
      })),
      amount: Number(total) || 0,
      shipping: 5,
      grandTotal: Number(total) + 5,
      customer: {
        name: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        city: form.city,
        zip: form.zip,
      },
      paymentMethod: form.payment || "cod",
      paymentStatus: "pending",
      createdAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem("minix-last-order", JSON.stringify(order));
    } catch (err) {
      console.error("Failed to save order locally", err);
    }

    clearCart();
    navigate("/order-success");
  };

  if (cartItems.length === 0) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-2xl mb-3">Your cart is empty</h2>
          <Link
            to="/shop"
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="px-6 lg:px-20 py-16">
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={18} /> Back to Cart
        </Link>

        <h1 className="text-4xl font-bold mb-12">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Billing Details</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="input-box"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  className="input-box"
                />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  className="input-box"
                />
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP / Postal Code"
                  onChange={handleChange}
                  className="input-box"
                />
              </div>

              <input
                type="text"
                name="address"
                placeholder="Street Address"
                onChange={handleChange}
                className="input-box mt-4"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                onChange={handleChange}
                className="input-box mt-4"
              />
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl">
              <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={form.payment === "cod"}
                  onChange={handleChange}
                />
                <span>Cash on Delivery (COD)</span>
              </label>

              <p className="text-gray-400 text-sm mt-2">
                Online payments will be added when backend is ready.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-xl h-fit"
          >
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

            <div className="space-y-3 max-h-56 overflow-auto pr-2">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start border-b border-white/10 pb-3"
                >
                  <div className="flex-1 pr-3">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-gray-400 text-sm">
                      {item.quantity} × ${item.price}
                    </p>
                  </div>
                  <p className="font-semibold">
                    ${(item.quantity * (Number(item.price) || 0)).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4 text-gray-300">
              <p>Subtotal</p>
              <p>${total.toFixed(2)}</p>
            </div>

            <div className="flex justify-between mt-1 text-gray-300">
              <p>Shipping</p>
              <p>$5.00</p>
            </div>

            <div className="border-t border-white/10 my-4"></div>

            <div className="flex justify-between text-lg font-semibold">
              <p>Total</p>
              <p>${(Number(total) + 5).toFixed(2)}</p>
            </div>

            <button
              onClick={handleOrder}
              className="w-full mt-6 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Place Order
            </button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
