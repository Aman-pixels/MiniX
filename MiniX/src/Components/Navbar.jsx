import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  ShoppingBag,
  Menu,
  X,
  ArrowRight
} from "lucide-react";
import axios from "axios";
import API_BASE_URL from "../config";

export default function Navbar() {
  const { cartItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fullscreen Menu links
  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/shop" },
    { name: "Archive", path: "/about" },
    { name: "Support", path: "/contact" }
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[0.16,1,0.3,1] ${scrolled ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent py-8"}`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* MENU TOGGLE (LEFT) */}
          <div className="flex-1 flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="group flex items-center gap-3 text-white mix-blend-difference"
            >
              <div className="flex flex-col gap-1.5 items-start">
                <span className="w-6 h-[2px] bg-white transition-all duration-300 group-hover:w-8" />
                <span className="w-4 h-[2px] bg-white transition-all duration-300 group-hover:w-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] hidden md:block">Menu</span>
            </button>
          </div>

          {/* LOGO (CENTER) */}
          <div 
            onClick={() => navigate("/")}
            className="flex-1 text-center cursor-pointer mix-blend-difference"
          >
            <span className="text-2xl font-black tracking-tighter uppercase text-white">MiniX</span>
          </div>

          {/* ACTIONS (RIGHT) */}
          <div className="flex-1 flex items-center justify-end gap-6 text-white mix-blend-difference">
            <button onClick={() => setSearchOpen(true)} className="hover:opacity-70 transition-opacity">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button onClick={() => navigate(user ? "/profile" : "/auth")} className="hover:opacity-70 transition-opacity hidden md:block">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative hover:opacity-70 transition-opacity flex items-center gap-2">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-2 text-[10px] bg-white text-black font-bold px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* FULLSCREEN OVERLAY MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
            exit={{ clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] bg-[#050505] text-white flex flex-col"
          >
            <div className="flex justify-between items-center p-6 lg:p-12">
              <span className="text-2xl font-black tracking-tighter uppercase">MiniX</span>
              <button 
                onClick={() => setMenuOpen(false)}
                className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:opacity-70 transition-opacity"
              >
                Close <X size={24} strokeWidth={1.5}/>
              </button>
            </div>

            <div className="flex-1 flex flex-col lg:flex-row max-w-[1400px] w-full mx-auto px-6 lg:px-12 py-10 gap-20">
              {/* Main Nav */}
              <div className="flex flex-col justify-center gap-4 flex-2">
                {menuLinks.map((link, i) => (
                  <div key={link.name} className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "100%" }}
                      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.1 * i }}
                    >
                      <NavLink 
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-6 text-[3rem] md:text-[5rem] font-black uppercase tracking-tighter leading-none hover:text-zinc-500 transition-colors"
                      >
                        <span className="text-sm font-mono text-zinc-600 mb-8 hidden md:block">0{i + 1}</span>
                        {link.name}
                        <ArrowRight size={48} className="opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[0.16,1,0.3,1] hidden md:block" />
                      </NavLink>
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Utility Nav */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="flex flex-col justify-end pb-12 gap-8 lg:ml-auto"
              >
                <div className="flex flex-col gap-4">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">Account</h4>
                  {user ? (
                    <>
                      <button onClick={() => { setMenuOpen(false); navigate("/profile"); }} className="text-lg font-medium hover:text-zinc-400 text-left">Profile</button>
                      <button onClick={() => { setMenuOpen(false); navigate("/orders"); }} className="text-lg font-medium hover:text-zinc-400 text-left">Orders</button>
                      <button onClick={() => { setMenuOpen(false); navigate("/wishlist"); }} className="text-lg font-medium hover:text-zinc-400 text-left">Wishlist</button>
                      <button onClick={() => { setMenuOpen(false); logoutUser(); }} className="text-lg font-medium text-red-500 hover:text-red-400 text-left">Logout</button>
                    </>
                  ) : (
                    <button onClick={() => { setMenuOpen(false); navigate("/auth"); }} className="text-lg font-medium hover:text-zinc-400 text-left">Login / Register</button>
                  )}
                </div>

                <div className="flex flex-col gap-4">
                  <h4 className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold mb-2">Social</h4>
                  <a href="#" className="text-lg font-medium hover:text-zinc-400">Instagram</a>
                  <a href="#" className="text-lg font-medium hover:text-zinc-400">Twitter (X)</a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FULLSCREEN SEARCH OVERLAY */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-6"
          >
            <button 
              onClick={() => setSearchOpen(false)}
              className="absolute top-8 right-8 text-white/50 hover:text-white"
            >
              <X size={32} strokeWidth={1} />
            </button>
            <div className="w-full max-w-3xl relative">
              <input 
                type="text" 
                placeholder="TYPE TO SEARCH..." 
                className="w-full bg-transparent border-b-2 border-white/20 text-4xl md:text-6xl text-white font-black uppercase tracking-tighter pb-4 outline-none placeholder-white/20 focus:border-white transition-colors"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    navigate(`/shop?search=${e.target.value}`);
                    setSearchOpen(false);
                  }
                }}
              />
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mt-6 font-bold">Press Enter to search</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
