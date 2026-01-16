// src/pages/OrderSuccess.jsx
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
      if (raw) setOrder(JSON.parse(raw));
    } catch { }
  }, []);

  if (!order) {
    return (
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
          <h2 className="text-2xl">No recent order found</h2>
          <Link
            to="/shop"
            className="px-6 py-3 bg-white text-black rounded-lg font-semibold"
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
          className="max-w-3xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md text-center"
        >
          <h1 className="text-3xl font-bold mb-2">
            Thanks — your order is confirmed
          </h1>

          <div className="bg-white/5 border border-white/10 rounded-lg p-4 text-left my-6">
            <p className="text-sm text-gray-400">Order ID</p>
            <p className="font-mono font-semibold">{order._id}</p>
            <p className="text-sm text-gray-400 mt-2">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 text-left mb-6">
            <div>
              <p className="text-sm text-gray-400">Status</p>
              <p className="mt-2 capitalize">{order.orderStatus}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400">Payment</p>
              <p className="mt-2 capitalize">{order.paymentMethod}</p>
              <p className="text-sm text-gray-300">
                Payment Status: {order.paymentStatus}
              </p>
              <p className="text-sm text-gray-300 mt-3 font-semibold">
                Total Paid: ${order.totalAmount.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Link
              to="/shop"
              className="px-6 py-3 bg-white text-black rounded-lg font-semibold"
            >
              Continue Shopping
            </Link>
            <button
              onClick={() => navigate("/")}
              className="px-6 py-3 bg-white/10 rounded-lg"
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
