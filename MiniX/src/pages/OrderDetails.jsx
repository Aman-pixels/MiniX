import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { ArrowLeft } from "lucide-react";

export default function OrderDetails() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem("minix-orders")) || [];
      const found = orders.find(o => o.orderId === orderId);
      setOrder(found || null);
    } catch {
      setOrder(null);
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <h2 className="text-2xl">Order not found</h2>
          <button
            onClick={() => navigate("/orders")}
            className="px-6 py-3 bg-white text-black rounded-lg"
          >
            Back to Orders
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <section className="pt-32 pb-24 max-w-4xl mx-auto px-4">
        <button
          onClick={() => navigate("/orders")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft size={18} /> Back to Orders
        </button>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-6">
          <div>
            <p className="text-sm text-gray-400">Order ID</p>
            <p className="font-mono">{order.orderId}</p>
            <p className="text-sm text-gray-400 mt-1">
              Placed on {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          {/* ORDER TRACKING STEPPER */}
          <div className="py-6 border-y border-white/10 my-4">
            <h3 className="text-sm text-gray-400 mb-6 uppercase tracking-wider font-bold">Track Order</h3>
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-white/10 z-0" />
              
              {["Processing", "Shipped", "Out for Delivery", "Delivered"].map((step, idx) => {
                const statuses = ["Processing", "Shipped", "Out for Delivery", "Delivered"];
                const currentIdx = statuses.indexOf(order.status || "Processing");
                const isCompleted = idx <= currentIdx;
                const isActive = idx === currentIdx;

                return (
                  <div key={step} className="relative z-10 flex flex-col items-center gap-2">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${isCompleted ? 'bg-white text-black' : 'bg-[#1e1f22] border-2 border-white/20 text-white/20'}`}>
                      {isCompleted ? "✓" : idx + 1}
                    </div>
                    <span className={`text-[10px] uppercase tracking-widest absolute -bottom-6 w-max text-center ${isActive ? 'text-white font-bold' : 'text-gray-500'}`}>
                      {step}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mt-12">
            <div>
              <p className="text-sm text-gray-400 mb-1">Delivery Address</p>
              <p>{order.address.name}</p>
              <p className="text-sm text-gray-300">
                {order.address.house}, {order.address.street}
              </p>
              <p className="text-sm text-gray-300">
                {order.address.city}, {order.address.state} – {order.address.pincode}
              </p>
              <p className="text-sm text-gray-300">
                Phone: {order.address.phone}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-1">Payment</p>
              <p className="capitalize">{order.paymentMethod}</p>
              <p className="text-sm text-gray-300">
                Status: {order.paymentStatus}
              </p>
              <p className="text-sm text-gray-300 mt-2">
                Total: ${order.grandTotal.toFixed(2)}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-400 mb-2">Items</p>
            <div className="space-y-3">
              {order.items.map(item => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    <p>{item.name}</p>
                    <p className="text-sm text-gray-400">
                      {item.quantity} × ${item.price}
                    </p>
                  </div>
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
