import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./Components/ScrollReveal";
// import { useCart } from "./context/CartContext"; // Removed unused import if no longer needed, or keep if used elsewhere

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Collections from "./Components/Collections";
import FeaturedProduct from "./Components/FeaturedProduct";



function App() {
  // const { showToastVisible, toastMessage } = useCart();

  return (
    <div className="min-h-screen bg-black text-white font-inter overflow-x-hidden">

      <Navbar />

      {/* NEW HERO */}
      <Hero />

      <ScrollReveal>
        <FeaturedProduct />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <Collections />
      </ScrollReveal>
      <Footer />

      {/* 🔔 Toast */}
      {/* 🔔 Toast moved to GlobalToast in main.jsx */}
    </div>
  );
}

export default App;
