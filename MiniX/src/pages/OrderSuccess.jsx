import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const raw = localStorage.getItem("minix-last-order");
      if (raw) {
        setOrder(JSON.parse(raw));
      }
    } catch (err) {
      console.error("Failed to read last order", err);
    }
  }, []);

  if (!order) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          <h2 className="text-2xl">No recent order found</h2>
          <p className="text-gray-400">Looks like you haven't placed an order yet.</p>
          <Link
            to="/shop"
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
          >
            Continue Shopping
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <section className="px-6 lg:px-20 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md shadow-xl text-center"
        >
          <div className="mx-auto w-24 h-24 rounded-full bg-white/10 flex items-center justify-center mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 text-green-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-3xl font-bold mb-2">Thanks — your order is confirmed</h1>
          <p className="text-gray-300 mb-6">We've received your order and will email the receipt shortly.</p>

          <div className="bg-[rgba(255,255,255,0.03)] border border-white/8 rounded-lg p-4 text-left mb-6">
            <p className="text-sm text-gray-400 mb-2">Order ID</p>
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono font-semibold">{order.orderId}</span>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText(order.orderId);
                }}
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Copy
              </button>
            </div>
            <p className="text-sm text-gray-400 mt-3">Placed on {new Date(order.createdAt).toLocaleString()}</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-left mb-6">
            <div>
              <p className="text-sm text-gray-400">Delivery Address</p>
              <p className="mt-2">{order.customer.name}</p>
              <p className="text-gray-300 text-sm">{order.customer.address}</p>
              <p className="text-gray-300 text-sm">{order.customer.city} • {order.customer.zip}</p>
              <p className="text-gray-300 text-sm">{order.customer.phone}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Payment</p>
              <p className="mt-2 capitalize">{order.paymentMethod}</p>
              <p className="text-gray-300 text-sm">Status: {order.paymentStatus}</p>
              <p className="text-gray-300 text-sm mt-3">Total: ${(order.grandTotal).toFixed(2)}</p>
            </div>
          </div>

          <div className="mb-6 text-left">
            <p className="text-sm text-gray-400 mb-2">Items</p>
            <div className="space-y-3 max-h-40 overflow-auto pr-2">
              {order.items.map((it) => (
                <div key={it.id} className="flex justify-between">
                  <div>
                    <p className="font-medium">{it.name}</p>
                    <p className="text-gray-400 text-sm">
                      {it.quantity} × ${it.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-semibold">${(it.price * it.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-[rgba(255,255,255,0.06)] text-gray-300 rounded-lg hover:bg-[rgba(255,255,255,0.09)] transition"
            >
              Go to Home
            </button>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
