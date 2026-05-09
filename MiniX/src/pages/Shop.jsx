import useSEO from "../hooks/useSEO";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import { Search, ChevronDown, Filter } from "lucide-react";
import axios from "axios";

import ShopSkeleton from "../Components/skeletons/ShopSkeleton";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ProductCard from "../Components/ProductCard";
import API_BASE_URL from "../config";

export default function Shop() {
  useSEO({
    title: "Archive // MiniX",
    description: "Browse the complete collection. Future kinetics apparel.",
    url: "/shop",
  });

  const [searchParams] = useSearchParams();

  /* ---------------- Products from Backend ---------------- */
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/api/product/all`);
        setProductData(data.products || []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  /* ---------------- URL → STATE ---------------- */
  const categoryFromURL = searchParams.get("category") || "ALL";
  const searchFromURL = searchParams.get("search") || "";

  const [activeCategory, setActiveCategory] = useState(categoryFromURL);
  const [searchQuery, setSearchQuery] = useState(searchFromURL);
  const [sortType, setSortType] = useState("relevance");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setActiveCategory(categoryFromURL.toUpperCase());
    setSearchQuery(searchFromURL);
  }, [categoryFromURL, searchFromURL]);

  /* ---------------- STATE → URL ---------------- */
  const updateURL = (updates) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      if (!value || value.toUpperCase() === "ALL") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    window.history.replaceState({}, "", `/shop?${params.toString()}`);
  };

  /* ---------------- Categories ---------------- */
  const categories = [
    "ALL",
    ...new Set(productData.map((p) => (p.category?.slug || "UNCATEGORIZED").toUpperCase())),
  ];

  /* ---------------- Filtering & Sorting ---------------- */
  const filteredProducts = productData.filter((p) => {
    const productCategory = (p.category?.slug || "UNCATEGORIZED").toUpperCase();
    const matchesCategory = activeCategory === "ALL" || productCategory === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "lowToHigh") return a.price - b.price;
    if (sortType === "highToLow") return b.price - a.price;
    return 0;
  });

  return (
    <div className="bg-[#050505] text-white min-h-[100svh] pt-[120px]">
      <Navbar />

      <main className="max-w-[1400px] mx-auto px-6 lg:px-12 pb-32">
        {/* HEADER */}
        <div className="py-12 md:py-24 border-b border-white/10 mb-12 relative overflow-hidden">
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[4rem] md:text-[8rem] font-black uppercase tracking-tighter leading-none"
          >
            Archive
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="text-zinc-500 font-mono text-sm uppercase tracking-widest mt-6 max-w-md"
          >
            A complete log of all issued garments. Sort, filter, and discover the kinetics.
          </motion.p>
        </div>

        {/* CONTROLS */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16">
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  updateURL({ category: cat });
                }}
                className={`px-5 py-2 text-xs font-mono uppercase tracking-widest transition-all duration-300 border ${
                  activeCategory === cat
                    ? "border-white text-black bg-white"
                    : "border-white/20 text-white/50 hover:text-white hover:border-white/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search + Sort */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-64">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="SEARCH..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  updateURL({ search: e.target.value });
                }}
                className="w-full bg-transparent border border-white/20 text-white text-xs font-mono uppercase tracking-widest pl-10 pr-4 py-3 focus:border-white outline-none transition-colors"
              />
            </div>

            <div className="relative">
              <button
                onClick={() => setDropdownOpen((s) => !s)}
                className="flex items-center gap-3 border border-white/20 px-5 py-3 text-xs font-mono uppercase tracking-widest hover:border-white transition-colors"
              >
                <Filter size={14} /> Sort
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-48 bg-[#111] border border-white/10 z-20 shadow-2xl"
                  >
                    {[
                      { key: "relevance", label: "Relevance" },
                      { key: "lowToHigh", label: "Price Ascending" },
                      { key: "highToLow", label: "Price Descending" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => {
                          setSortType(opt.key);
                          setDropdownOpen(false);
                        }}
                        className={`block w-full text-left px-5 py-3 text-xs font-mono uppercase tracking-widest transition-colors ${sortType === opt.key ? 'bg-white text-black' : 'text-zinc-400 hover:bg-white/10 hover:text-white'}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* GRID */}
        {loading ? (
          <ShopSkeleton />
        ) : sortedProducts.length === 0 ? (
          <div className="py-32 flex flex-col items-center justify-center border border-white/10 text-center">
            <p className="text-4xl font-black uppercase tracking-tighter text-white/20 mb-2">No Signal</p>
            <p className="text-zinc-500 font-mono text-sm uppercase tracking-widest">Adjust your filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            <AnimatePresence mode="popLayout">
              {sortedProducts.map((product, idx) => (
                <motion.div
                  key={product._id || product.slug}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: idx * 0.05 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
