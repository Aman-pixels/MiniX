import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "./Components/ScrollReveal";
import useSEO from "./hooks/useSEO";

import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Hero from "./Components/Hero";
import Collections from "./Components/Collections";
import FeaturedProduct from "./Components/FeaturedProduct";



function App() {
  useSEO({
    title: "Premium Fashion & Streetwear",
    description:
      "Discover MiniX's exclusive streetwear collections. Shop men's and women's premium clothing, accessories, and limited drops. Fast shipping & secure checkout.",
    url: "/",
  });

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
