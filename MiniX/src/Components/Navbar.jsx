import React, { useState, useEffect } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  User,
  ShoppingBag,
  X,
  ArrowRight
} from "lucide-react";

export default function Navbar() {
  const { cartItems, setIsCartOpen } = useCart();
  const { wishlist } = useWishlist();
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

  const menuLinks = [
    { name: "Home", path: "/" },
    { name: "Collections", path: "/shop" },
    { name: "Archive", path: "/about" },
    { name: "Support", path: "/contact" }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "bg-[#1e2023]/95 backdrop-blur-md border-b border-[#47484c] py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* MENU TOGGLE (LEFT) */}
          <div className="flex-1 flex items-center">
            <button
              onClick={() => setMenuOpen(true)}
              className="group flex items-center gap-3 text-white hover:text-zinc-300 transition-colors cursor-pointer"
            >
              <div className="flex flex-col gap-1.5 items-start">
                <span className="w-6 h-[2px] bg-current transition-all duration-300 group-hover:w-8" />
                <span className="w-4 h-[2px] bg-current transition-all duration-300 group-hover:w-8" />
              </div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] hidden md:block">Menu</span>
            </button>
          </div>

          {/* LOGO (CENTER) */}
          <div 
            onClick={() => navigate("/")}
            className="flex-1 text-center cursor-pointer"
          >
            <span className="text-2xl font-black tracking-tighter uppercase text-white hover:opacity-80 transition-opacity">
              MiniX
            </span>
          </div>

          {/* ACTIONS (RIGHT) */}
          <div className="flex-1 flex items-center justify-end gap-6 text-white">
            
            {/* INLINE SEARCH BAR (Hidden on mobile) */}
            <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-b border-[#47484c] text-white text-xs font-mono uppercase tracking-widest px-2 py-1 focus:border-white focus:outline-none transition-colors w-40 focus:w-56"
              />
              <button type="submit" className="absolute right-0 text-[#4c4e51] hover:text-white transition-colors">
                <Search size={16} />
              </button>
            </form>

            <button onClick={() => navigate(user ? "/profile" : "/auth")} className="hover:text-zinc-400 transition-colors hidden md:block">
              <User size={20} strokeWidth={1.5} />
            </button>
            
            <button onClick={() => setIsCartOpen(true)} className="relative hover:text-zinc-400 transition-colors flex items-center gap-2">
              <ShoppingBag size={20} strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1.5 -right-2 text-[10px] bg-white text-black font-bold px-1.5 py-0.5 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* FULLSCREEN OVERLAY MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-[#1e2023] text-white selection:bg-[#4c4e51] selection:text-white overflow-y-auto"
          >
            <div className="min-h-screen flex flex-col w-full">
              <div className="flex justify-between items-center p-6 lg:p-12 shrink-0">
                <span className="text-2xl font-black tracking-tighter uppercase cursor-pointer hover:opacity-70 transition-opacity" onClick={() => { setMenuOpen(false); navigate("/"); }}>
                  MiniX
                </span>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-3 hover:text-zinc-400 transition-colors"
                >
                  Close <X size={24} strokeWidth={1.5}/>
                </button>
              </div>

              <div className="flex-1 flex flex-col lg:flex-row max-w-[1400px] w-full mx-auto px-6 lg:px-12 py-10 gap-16 lg:gap-20">
                
                {/* Main Nav */}
                <div className="flex flex-col justify-center gap-4 w-full lg:w-2/3">
                  {/* Mobile Search Bar */}
                  <form onSubmit={handleSearchSubmit} className="flex lg:hidden items-center relative mb-12">
                    <input
                      type="text"
                      placeholder="Search catalog..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-b border-[#47484c] text-white text-sm font-mono uppercase tracking-widest px-2 py-3 focus:border-white focus:outline-none transition-colors"
                    />
                    <button type="submit" className="absolute right-0 px-4 text-[#4c4e51] hover:text-white transition-colors">
                      <Search size={20} />
                    </button>
                  </form>

                  {menuLinks.map((link, i) => (
                    <div key={link.name} className="py-2">
                      <NavLink 
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-6 text-4xl sm:text-5xl md:text-[5rem] font-black uppercase tracking-tighter leading-none hover:text-[#4c4e51] transition-colors"
                      >
                        <span className="text-sm font-mono text-[#4c4e51] mb-4 md:mb-8 hidden md:block">0{i + 1}</span>
                        {link.name}
                        <ArrowRight size={48} className="opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[0.16,1,0.3,1] hidden md:block" />
                      </NavLink>
                    </div>
                  ))}
                </div>

                {/* Utility Nav */}
                <div className="flex flex-col justify-end pb-12 gap-12 lg:ml-auto w-full lg:w-1/3 mt-auto lg:mt-0">
                  <div className="flex flex-col gap-6">
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#4c4e51] font-bold border-b border-[#47484c] pb-2">System Access</h4>
                    {user ? (
                      <>
                        <button onClick={() => { setMenuOpen(false); navigate("/profile"); }} className="text-sm font-bold uppercase tracking-wider hover:text-zinc-400 text-left transition-colors">Profile</button>
                        <button onClick={() => { setMenuOpen(false); navigate("/orders"); }} className="text-sm font-bold uppercase tracking-wider hover:text-zinc-400 text-left transition-colors">Orders</button>
                        <button onClick={() => { setMenuOpen(false); navigate("/wishlist"); }} className="text-sm font-bold uppercase tracking-wider hover:text-zinc-400 text-left transition-colors">Wishlist</button>
                        <button onClick={() => { setMenuOpen(false); logoutUser(); }} className="text-sm font-bold uppercase tracking-wider text-red-500 hover:text-red-400 text-left transition-colors mt-4">Terminate Session</button>
                      </>
                    ) : (
                      <button onClick={() => { setMenuOpen(false); navigate("/auth"); }} className="text-sm font-bold uppercase tracking-wider hover:text-zinc-400 text-left transition-colors">Authenticate</button>
                    )}
                  </div>

                  <div className="flex flex-col gap-6">
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#4c4e51] font-bold border-b border-[#47484c] pb-2">Comms Network</h4>
                    <a href="#" className="text-sm font-bold uppercase tracking-wider hover:text-zinc-400 transition-colors">Instagram</a>
                    <a href="#" className="text-sm font-bold uppercase tracking-wider hover:text-zinc-400 transition-colors">Twitter (X)</a>
                    <a href="mailto:support@minix.com" className="text-sm font-bold uppercase tracking-wider hover:text-zinc-400 transition-colors mt-4">support@minix.com</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
