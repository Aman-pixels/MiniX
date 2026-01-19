import React, { useState, useEffect, useMemo } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  Heart,
  ShoppingBag,
  LogOut,
  LogIn,
  MapPin,
  CreditCard,
  Package,
  HelpCircle,
} from "lucide-react";
import productData from "../data/productData";

export default function Navbar() {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 🔍 Search state
  const [query, setQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔎 Search logic (only existing products)
  const suggestions = useMemo(() => {
    if (!query.trim()) return [];

    const q = query.toLowerCase();

    return productData
      .filter((p) => p.name.toLowerCase().includes(q))
      .slice(0, 5);
  }, [query]);

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      if (suggestions.length > 0) {
        navigate(`/product/${suggestions[0].id}`);
        setQuery("");
        setShowResults(false);
      }
    }
  };

  return (
    <nav
      className={`
        fixed top-0 left-0 w-full z-50
        transition-all duration-300
        ${scrolled ? "glass py-3" : "bg-transparent py-5"}
      `}
    >
      <div className="max-w-[1250px] mx-auto px-6 flex items-center justify-between gap-6">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-wide cursor-pointer"
        >
          MiniX
        </div>

        {/* MID LINKS */}
        <ul className="hidden lg:flex gap-10 text-white/80 font-medium">
          {["shop", "about", "contact"].map((link) => (
            <NavLink
              key={link}
              to={`/ ${link} `}
              className={({ isActive }) =>
                `capitalize hover: text - white transition ${isActive ? "text-white font-semibold" : ""
                } `
              }
            >
              {link}
            </NavLink>
          ))}
        </ul>

        {/* SEARCH */}
        <div className="hidden md:flex relative w-64">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
          />
          <input
            type="text"
            placeholder="Search products..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowResults(true);
            }}
            onKeyDown={handleEnter}
            className="
              w-full bg-white/5 border border-white/10 rounded-xl
              py-2 pl-10 pr-3 text-sm text-white placeholder-white/40
              focus:border-white/40 focus:bg-white/10 transition outline-none
            "
          />

          {/* SEARCH RESULTS */}
          <AnimatePresence>
            {showResults && query && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="
                  absolute top-12 left-0 w-full
                  glass-card z-50
                  overflow-hidden
                "
              >
                {suggestions.length > 0 ? (
                  suggestions.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        navigate(`/ product / ${item.id} `);
                        setQuery("");
                        setShowResults(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-white/10 transition-colors"
                    >
                      {item.name}
                    </button>
                  ))
                ) : (
                  <div className="px-4 py-3 text-sm text-white/50">
                    No products found
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RIGHT ICONS */}
        <div className="flex items-center gap-6">
          {/* PROFILE */}
          <div className="relative">
            <User
              size={26}
              className="cursor-pointer hover:text-gray-300 transition"
              onClick={() => setProfileOpen(!profileOpen)}
            />

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="
                    absolute right-0 mt-3 w-52
                    glass-card p-4 z-50
                  "
                >
                  {user ? (
                    <>
                      <p className="text-white/80 text-sm mb-4">
                        Logged in as
                        <span className="block font-medium text-white mt-0.5">
                          {user.name}
                        </span>
                      </p>

                      <div className="flex flex-col gap-2">
                        <button onClick={() => navigate("/profile")} className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
                          <User size={16} /> My Profile
                        </button>

                        <button onClick={() => navigate("/orders")} className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
                          <Package size={16} /> Orders
                        </button>

                        <button onClick={() => navigate("/wishlist")} className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
                          <Heart size={16} /> Wishlist
                        </button>

                        <button onClick={() => navigate("/addresses")} className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
                          <MapPin size={16} /> Addresses
                        </button>

                        <button onClick={() => navigate("/payments")} className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
                          <CreditCard size={16} /> Payments
                        </button>
                      </div>

                      <div className="border-t border-white/10 my-3" />

                      <button onClick={logoutUser} className="flex items-center gap-3 text-sm text-red-400 hover:text-red-300">
                        <LogOut size={16} /> Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => navigate("/auth")} className="flex items-center gap-3 text-sm text-white hover:text-gray-300 mb-2">
                        <LogIn size={16} /> Login / Sign Up
                      </button>

                      <button onClick={() => navigate("/help")} className="flex items-center gap-3 text-sm text-white/80 hover:text-white">
                        <HelpCircle size={16} /> Help & Support
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* WISHLIST */}
          <div className="relative cursor-pointer" onClick={() => navigate(user ? "/wishlist" : "/auth")}>
            <Heart size={24} />
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* CART */}
          <div className="relative cursor-pointer" onClick={() => navigate(user ? "/cart" : "/auth")}>
            <ShoppingBag size={24} />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
