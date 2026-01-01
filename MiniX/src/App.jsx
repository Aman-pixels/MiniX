import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./context/CartContext";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Collections from "./Components/Collections";
import FeaturedProduct from "./Components/FeaturedProduct";



function App() {
  const { showToastVisible, toastMessage } = useCart();

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">

      <Navbar />

      {/* NEW HERO */}
      <Hero />

      <FeaturedProduct />
      <Collections />
      <Footer />

      {/* Toast */}
      <AnimatePresence>
        {showToastVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-6 right-6 bg-white/10 backdrop-blur-xl px-6 py-3 rounded-xl text-white border border-white/20 shadow-lg"
          >
            {toastMessage}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default App;
