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
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#050505] text-white selection:bg-[#4c4e51] selection:text-white overflow-hidden"
          >
            {/* Pure CSS Animations for bulletproof staggering */}
            <style>{`
              @keyframes fadeSlideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-stagger {
                opacity: 0;
                animation: fadeSlideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}</style>

            {/* Cinematic Noise & Background Blur */}
            <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
              <img src="/Hero.jpg" alt="Atmosphere" className="w-full h-full object-cover mix-blend-luminosity blur-[100px] scale-110" />
            </div>
            <div className="absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            <div className="relative z-10 min-h-screen flex flex-col w-full overflow-y-auto">
              {/* Header properly aligned to the 1400px grid */}
              <div className="w-full max-w-[1400px] mx-auto px-6 lg:px-12 py-6 lg:py-12 flex justify-between items-center shrink-0">
                <span className="text-2xl font-black tracking-tighter uppercase cursor-pointer hover:opacity-70 transition-opacity animate-stagger" style={{ animationDelay: '0.1s' }} onClick={() => { setMenuOpen(false); navigate("/"); }}>
                  MiniX
                </span>
                <button 
                  onClick={() => setMenuOpen(false)}
                  className="text-xs font-mono uppercase tracking-[0.2em] flex items-center gap-3 hover:text-zinc-400 transition-colors animate-stagger" style={{ animationDelay: '0.1s' }}
                >
                  Close <X size={20} strokeWidth={1}/>
                </button>
              </div>

              <div className="flex-grow flex flex-col lg:flex-row max-w-[1400px] w-full mx-auto px-6 lg:px-12 pb-12 lg:pb-20 gap-16 lg:gap-24">
                
                {/* Main Nav Links */}
                <div className="flex flex-col justify-center gap-4 w-full lg:w-3/5">
                  <div 
                    className="mb-6 hidden lg:block animate-stagger"
                    style={{ animationDelay: '0.1s' }}
                  >
                    <p className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500">
                      Minimal outside. Loud inside.
                    </p>
                  </div>

                  <form 
                    onSubmit={handleSearchSubmit} 
                    className="flex lg:hidden items-center relative mb-8 animate-stagger"
                    style={{ animationDelay: '0.1s' }}
                  >
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent border-b border-zinc-800 text-white text-sm font-mono uppercase tracking-widest px-2 py-3 focus:border-white focus:outline-none transition-colors"
                    />
                    <button type="submit" className="absolute right-0 px-4 text-zinc-500 hover:text-white transition-colors">
                      <Search size={18} strokeWidth={1} />
                    </button>
                  </form>

                  {[
                    { name: "Collections", path: "/shop" },
                    { name: "Essentials", path: "/shop?search=essentials" },
                    { name: "The Journal", path: "/about" },
                    { name: "Everyday Uniform", path: "/shop" }
                  ].map((link, i) => (
                    <div 
                      key={link.name} 
                      className="py-1 overflow-hidden animate-stagger"
                      style={{ animationDelay: `${0.2 + (i * 0.1)}s` }}
                    >
                      <NavLink 
                        to={link.path}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-6 text-4xl sm:text-5xl md:text-[5.5rem] font-medium tracking-tighter leading-none text-zinc-400 hover:text-white transition-colors duration-500"
                      >
                        <span className="text-[10px] font-mono text-zinc-600 mb-6 hidden md:block group-hover:text-white transition-colors duration-500">0{i + 1}</span>
                        {link.name}
                      </NavLink>
                    </div>
                  ))}
                </div>

                {/* Right Panel / Emotional Lifestyle */}
                <div 
                  className="flex flex-col justify-end pb-8 gap-16 lg:ml-auto w-full lg:w-2/5 mt-auto lg:mt-0 lg:pl-12 animate-stagger"
                  style={{ animationDelay: '0.5s' }}
                >
                  <div className="flex flex-col gap-6">
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 border-b border-zinc-800 pb-2">
                      Personal Space
                    </h4>
                    {user ? (
                      <div className="flex flex-col gap-3">
                        <button onClick={() => { setMenuOpen(false); navigate("/profile"); }} className="text-sm font-light tracking-wide text-zinc-400 hover:text-white text-left transition-colors">Your Profile</button>
                        <button onClick={() => { setMenuOpen(false); navigate("/orders"); }} className="text-sm font-light tracking-wide text-zinc-400 hover:text-white text-left transition-colors">Past Orders</button>
                        <button onClick={() => { setMenuOpen(false); navigate("/wishlist"); }} className="text-sm font-light tracking-wide text-zinc-400 hover:text-white text-left transition-colors">Saved Pieces</button>
                        <button onClick={() => { setMenuOpen(false); logoutUser(); }} className="text-sm font-light tracking-wide text-zinc-600 hover:text-red-400 text-left transition-colors mt-2">Sign Out</button>
                      </div>
                    ) : (
                      <button onClick={() => { setMenuOpen(false); navigate("/auth"); }} className="text-sm font-light tracking-wide text-zinc-400 hover:text-white text-left transition-colors">Sign In / Register</button>
                    )}
                  </div>

                  <div className="flex flex-col gap-6">
                    <h4 className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-600 border-b border-zinc-800 pb-2">
                      Community
                    </h4>
                    <div className="flex flex-col gap-3">
                      <a href="#" className="text-sm font-light tracking-wide text-zinc-400 hover:text-white transition-colors">Instagram</a>
                      <a href="#" className="text-sm font-light tracking-wide text-zinc-400 hover:text-white transition-colors">Pinterest</a>
                      <a href="mailto:studio@minix.com" className="text-sm font-light tracking-wide text-zinc-400 hover:text-white transition-colors mt-2">studio@minix.com</a>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 leading-relaxed">
                      Designed for people who feel <br/> everything deeply.
                    </p>
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
