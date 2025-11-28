import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [toast, setToast] = useState(null);
  const hasLoaded = useRef(false);

  useEffect(() => {
    if (hasLoaded.current) return;
    hasLoaded.current = true;
    try {
      const savedCart = JSON.parse(localStorage.getItem("minix-cart") || "[]");
      if (Array.isArray(savedCart)) setCartItems(savedCart);
    } catch (err) {
      console.error("Error loading cart:", err);
    }
  }, []);

  // local storage 
  useEffect(() => {
    if (!hasLoaded.current) return;
    localStorage.setItem("minix-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Update total
  useEffect(() => {
    setTotal(
      cartItems.reduce((acc, item) => {
        const price =
          typeof item.price === "string"
            ? parseFloat(item.price.replace("$", ""))
            : item.price;
        return acc + price * item.quantity;
      }, 0)
    );
  }, [cartItems]);

  //  Toast handler
  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 2500);
  };

  //  Add item
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        showToast(`${product.name} quantity updated`);
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      showToast(`${product.name} added to cart`);
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCartItems((prev) => prev.filter((item) => item.id !== id));

  const updateQuantity = (id, delta) =>
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(1, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("minix-cart");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        total,
        clearCart,
      }}
    >
      {children}
      {/* ✅ Toast Notification */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed bottom-6 right-6 bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.2)] backdrop-blur-md px-6 py-3 rounded-xl shadow-lg text-white text-sm font-medium z-[999]"
          >
            ✅ {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
