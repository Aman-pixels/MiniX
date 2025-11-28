import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { ChevronDown, Search, X } from "lucide-react";

import { useCart } from "../context/CartContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Collections from "../Components/Collections";
import productData from "../data/productData";

export default function Shop() {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();

  // URL-driven category (keeps back/forward behavior)
  const categoryFromURL = searchParams.get("category") || "All";

  // UI state
  const [activeCategory, setActiveCategory] = useState(categoryFromURL);
  const [sortType, setSortType] = useState("relevance");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [page, setPage] = useState(1);

  // Ensure state follows URL param when changed externally
  useEffect(() => {
    setActiveCategory(categoryFromURL);
    setPage(1);
  }, [categoryFromURL]);

  // Categories pulled from data with fallback "All"
  const categories = ["All", ...new Set(productData.map((p) => p.category || "Uncategorized"))];

  // Filter logic
  const filteredProducts = productData.filter((p) => {
    const matchesCategory = activeCategory === "All" || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesCategory && matchesSearch && matchesPrice;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortType) {
      case "lowToHigh":
        return a.price - b.price;
      case "highToLow":
        return b.price - a.price;
      case "popularity":
        return (b.reviews?.length || 0) - (a.reviews?.length || 0);
      default:
        return a.id - b.id;
    }
  });

  // Pagination
  const perPage = 8;
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / perPage));
  const pageProducts = sortedProducts.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="bg-black text-white min-h-screen pt-28"> {/* pt-28 prevents overlap with fixed navbar */}
      <Navbar />

      {/* BANNER */}
      <div className="w-full bg-gradient-to-r from-[#0b0b0b]/80 to-[#f6f5f3]/10 py-6">
        <div className="max-w-[1250px] mx-auto px-6">
          <div className="rounded-xl overflow-hidden bg-[url('https://images.unsplash.com/photo-1541099649105-f69ad21f3246')] bg-cover bg-center h-44 md:h-56 shadow-lg flex items-center px-6">
            <div className="text-white/95">
              <h2 className="text-3xl md:text-4xl font-bold">Shop</h2>
              <p className="text-gray-300 mt-2">Discover our latest drops and timeless essentials</p>
            </div>
          </div>
        </div>
      </div>

      {/* SHOP BY CATEGORY */}
      <Collections />

      {/* FILTERS + SEARCH + SORT */}
      <div className="max-w-[1250px] mx-auto px-6 mt-8 mb-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          {/* Category chips */}
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="flex flex-wrap justify-center md:justify-start gap-3 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat); setPage(1); }}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-white text-black shadow-[0_0_10px_rgba(255,255,255,0.06)]"
                    : "text-gray-300 hover:text-white hover:bg-[rgba(255,255,255,0.03)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>

          {/* Search, price, sort */}
          <div className="flex flex-wrap justify-center md:justify-end items-center gap-4">
            {/* Search */}
            <div className="relative w-[280px]">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
                className="bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] rounded-lg pl-10 pr-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-white transition"
              />
            </div>

            {/* Price range */}
            <div className="flex items-center gap-2">
              <span className="text-gray-400 text-sm">$0</span>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={priceRange[1]}
                onChange={(e) => { setPriceRange([0, Number(e.target.value)]); setPage(1); }}
                className="accent-white w-28 cursor-pointer"
              />
              <span className="text-gray-400 text-sm">${priceRange[1]}</span>
            </div>

            {/* Sort */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((s) => !s)}
                className="flex items-center gap-2 bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.06)] backdrop-blur-lg px-4 py-2 rounded-lg text-sm hover:bg-[rgba(255,255,255,0.06)] transition"
              >
                Sort:
                <span className="font-semibold capitalize ml-1">
                  {sortType === "lowToHigh"
                    ? "Low to High"
                    : sortType === "highToLow"
                    ? "High to Low"
                    : sortType === "popularity"
                    ? "Popularity"
                    : "Relevance"}
                </span>
                <ChevronDown size={16} />
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute right-0 mt-2 w-48 bg-[rgba(10,10,10,0.95)] border border-[rgba(255,255,255,0.06)] backdrop-blur-xl rounded-xl shadow-xl z-10"
                  >
                    {[
                      { key: "relevance", label: "Relevance" },
                      { key: "lowToHigh", label: "Price: Low to High" },
                      { key: "highToLow", label: "Price: High to Low" },
                      { key: "popularity", label: "Popularity" },
                    ].map((opt) => (
                      <button
                        key={opt.key}
                        onClick={() => { setSortType(opt.key); setDropdownOpen(false); setPage(1); }}
                        className={`block w-full text-left px-4 py-2 text-sm rounded-lg hover:bg-[rgba(255,255,255,0.03)] transition ${
                          sortType === opt.key ? "text-white font-medium" : "text-gray-300"
                        }`}
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
      </div>

      {/* PRODUCT GRID */}
      <section className="max-w-[1250px] mx-auto px-6 pb-24">
        {sortedProducts.length === 0 ? (
          <div className="text-center text-gray-400 py-14">
            <p>No products found.</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); setPriceRange([0,100]); }}
              className="mt-4 px-4 py-2 bg-white text-black rounded-lg"
            >
              View All
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
              {pageProducts.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="group bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-all duration-300"
                >
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-72 object-cover opacity-80 group-hover:opacity-100 transition"
                    />
                  </Link>

                  <div className="p-5 space-y-2 text-center">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="text-lg font-semibold hover:text-gray-200 transition">{product.name}</h3>
                    </Link>
                    <p className="text-gray-400">${product.price}</p>
                    <button
                      onClick={() => addToCart(product)}
                      className="mt-3 w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
                    >
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]"
                disabled={page === 1}
              >
                ←
              </button>

              {[...Array(totalPages)].map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setPage(idx + 1)}
                  className={`px-3 py-1 rounded-full ${page === idx + 1 ? "bg-white text-black" : "bg-[rgba(255,255,255,0.02)] text-gray-300"}`}
                >
                  {idx + 1}
                </button>
              ))}

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 rounded-md bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.04)]"
                disabled={page === totalPages}
              >
                →
              </button>
            </div>
          </>
        )}
      </section>

      <Footer />
    </div>
  );
}
