// src/Components/Collections.jsx
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const categories = [
  {
    name: "Hoodies",
    slug: "Hoodies",
    image:
      "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=1400&q=80",
    cta: "Tap to view all hoodies →",
  },
  {
    name: "Tees",
    slug: "Tees",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1400&q=80",
    cta: "Tap to view all tees →",
  },
  {
    name: "Bottoms",
    slug: "Bottoms",
    image:
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=1400&q=80",
    cta: "Tap to view all bottoms →",
  },
  {
    name: "Accessories",
    slug: "Accessories",
    image:
      "https://images.unsplash.com/photo-1592878849126-2f1fdf5d93a6?auto=format&fit=crop&w=1400&q=80",
    cta: "Tap to view all accessories →",
  },
];

export default function Collections() {
  const navigate = useNavigate();

  const handleClick = (slug) => {
    if (slug === "All") {
      navigate("/shop");
    } else {
      navigate(`/shop?category=${slug}`);
    }
  };

  return (
    <section className="bg-black px-6 lg:px-20 pt-16 pb-10">
      {/* Top heading row */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
        <div>
          <p className="text-xs tracking-[0.2em] text-gray-400 uppercase mb-2">
            Curated Picks
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Shop by Category
          </h2>
          <p className="text-sm md:text-base text-gray-400 max-w-2xl">
            Explore essential pieces across all categories — built to mix,
            match, and live in your everyday fits.
          </p>
        </div>

        <button
          onClick={() => handleClick("All")}
          className="text-sm md:text-base text-gray-300 hover:text-white inline-flex items-center gap-1 self-start md:self-end"
        >
          View all products
          <span className="text-lg leading-none">→</span>
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {categories.map((cat, index) => (
          <motion.button
            key={cat.name}
            onClick={() => handleClick(cat.slug)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            whileHover={{ y: -6, scale: 1.01 }}
            className="
              relative group overflow-hidden rounded-3xl
              aspect-[4/3] w-full text-left
              shadow-[0_18px_60px_rgba(0,0,0,0.6)]
            "
          >
            {/* Background image */}
            <img
              src={cat.image}
              alt={cat.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5" />

            {/* Content */}
            <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6">
              <div className="text-xs tracking-[0.25em] text-gray-300 uppercase">
                Category
              </div>

              <div>
                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs md:text-sm text-gray-200 flex items-center gap-1">
                  {cat.cta}
                  <span className="group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </p>
              </div>
            </div>

            {/* Subtle border on hover */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl border border-transparent group-hover:border-white/30 transition-colors" />
          </motion.button>
        ))}
      </div>
    </section>
  );
}
