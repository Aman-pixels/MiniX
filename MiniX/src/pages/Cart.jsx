import React from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Trash2, ShoppingBag } from "lucide-react";

export default function Cart() {
    const { cartItems, removeFromCart, updateQuantity, total, clearCart } =
        useCart();
    const navigate = useNavigate();

    return (
        <div className="bg-black text-white min-h-screen">
            <Navbar />

            {/* HEADER */}
            <section className="text-center py-14">
                <h1 className="text-4xl font-bold">Your Cart</h1>
                <p className="text-gray-400 mt-2">Review your selected items</p>
            </section>

            {/* ===============================
          CART CONTENT
      =============================== */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="px-8 lg:px-20 pb-24"
            >
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center text-center py-24">
                        <ShoppingBag size={60} className="text-gray-500 mb-6" />
                        <p className="text-gray-400 mb-4">Your cart is currently empty.</p>
                        <Link
                            to="/shop"
                            className="px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-10">
                        {/* LEFT: CART ITEMS */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item, i) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="flex items-center justify-between bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-5 backdrop-blur-md shadow-lg"
                                >
                                    <div className="flex items-center gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className="w-24 h-24 object-cover rounded-xl"
                                        />
                                        <div>
                                            <h3 className="text-lg font-semibold">{item.name}</h3>
                                            <p className="text-gray-400 text-sm">
                                                {item.selectedColor && (
                                                    <>
                                                        Color:{" "}
                                                        <span className="capitalize text-white">
                                                            {item.selectedColor}
                                                        </span>
                                                    </>
                                                )}
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                Size:{" "}
                                                <span className="text-white">{item.selectedSize}</span>
                                            </p>
                                            <p className="font-semibold mt-2">${item.price}</p>
                                        </div>
                                    </div>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center gap-3">
                                        <button
                                            onClick={() => updateQuantity(item.id, -1)}
                                            className="px-3 py-1 bg-[rgba(255,255,255,0.1)] rounded hover:bg-[rgba(255,255,255,0.2)]"
                                        >
                                            -
                                        </button>
                                        <span className="w-6 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, 1)}
                                            className="px-3 py-1 bg-[rgba(255,255,255,0.1)] rounded hover:bg-[rgba(255,255,255,0.2)]"
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-gray-400 hover:text-red-500 transition ml-4"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </motion.div>
                            ))}
                        </div>

                        {/* RIGHT: ORDER SUMMARY */}
                        <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-2xl p-6 backdrop-blur-md shadow-lg h-fit sticky top-28">
                            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
                            <div className="flex justify-between mb-2 text-gray-300">
                                <p>Subtotal</p>
                                <p>${total.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between mb-2 text-gray-300">
                                <p>Shipping</p>
                                <p>$5.00</p>
                            </div>
                            <div className="border-t border-[rgba(255,255,255,0.1)] my-4"></div>
                            <div className="flex justify-between text-lg font-semibold">
                                <p>Total</p>
                                <p>${(total + 5).toFixed(2)}</p>
                            </div>

                            <button
                                onClick={() => navigate("/checkout")}
                                className="w-full mt-6 bg-white text-black py-3 rounded-lg font-semibold hover:bg-gray-200 transition"
                            >
                                Proceed to Checkout
                            </button>

                            <button
                                onClick={clearCart}
                                className="w-full mt-3 bg-[rgba(255,255,255,0.1)] text-gray-300 py-3 rounded-lg hover:bg-[rgba(255,255,255,0.2)] transition"
                            >
                                Clear Cart
                            </button>

                            <Link
                                to="/shop"
                                className="block text-center text-gray-400 hover:text-white text-sm mt-4 transition"
                            >
                                ← Continue Shopping
                            </Link>
                        </div>
                    </div>
                )}
            </motion.section>

            <Footer />
        </div>
    );
}
