import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Package } from "lucide-react";
import { Link } from "react-router-dom";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("minix-orders")) || [];
      setOrders(stored);
    } catch {
      setOrders([]);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="pt-32 pb-24 max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-semibold mb-8">Your Orders</h1>

        {orders.length === 0 ? (
          <div className="flex flex-col items-center text-center mt-24">
            <Package size={64} className="text-white/40 mb-6" />
            <p className="text-white/60 mb-6">
              You haven’t placed any orders yet.
            </p>
            <Link
              to="/shop"
              className="px-6 py-3 bg-white text-black rounded-xl font-medium"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <Link
                key={order.orderId}
                to={`/orders/${order.orderId}`}
                className="block bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition"
              >
                <div className="flex justify-between mb-2">
                  <div>
                    <p className="text-sm text-gray-400">Order ID</p>
                    <p className="font-mono">{order.orderId}</p>
                  </div>
                  <p className="text-sm text-gray-400">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-400">
                      {order.items.length} item(s)
                    </p>
                    <p className="text-sm text-gray-400">
                      Payment: {order.paymentMethod.toUpperCase()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-lg font-semibold">
                      ${order.grandTotal.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400 capitalize">
                      {order.paymentStatus}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
