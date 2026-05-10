import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
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
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Heart,
  Bookmark,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Barcode
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

  const mainLinks = [
    { name: "HOME", path: "/", desc: "Return to the\nmain universe." },
    { name: "COLLECTIONS", path: "/shop", desc: "Explore all\ndrops & pieces." },
    { name: "ESSENTIALS", path: "/shop?search=essentials", desc: "Everyday staples.\nAlways on rotation." },
    { name: "THE JOURNAL", path: "/about", desc: "Stories, thoughts\n& creative logs." },
    { name: "ABOUT MINIX", path: "/about", desc: "Our story, our vision\n& what we stand for." }
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
        {menuOpen && createPortal(
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] bg-[#0c0c0c] text-white selection:bg-[#4c4e51] selection:text-white overflow-hidden flex flex-col"
          >
            {/* Pure CSS Animations */}
            <style>{`
              @keyframes fadeSlideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
              }
              .animate-stagger {
                opacity: 0;
                animation: fadeSlideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
              }
            `}</style>

            <div className="flex flex-col lg:flex-row w-full flex-grow h-[calc(100vh-50px)] min-h-0">
              
              {/* LEFT PANEL */}
              <div className="relative w-full lg:w-[65%] h-full border-r border-[#1a1a1a] flex flex-col justify-between p-8 lg:p-12 overflow-y-auto">
                {/* Background Image / Blur */}
                <div className="absolute top-0 right-0 bottom-0 w-3/4 z-0 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10" />
                  <img src="/Hero.jpg" alt="" className="w-full h-full object-cover object-right opacity-[0.15] mix-blend-luminosity grayscale scale-105" />
                </div>

                {/* Left Panel Header */}
                <div className="relative z-10 flex gap-6 items-start animate-stagger shrink-0" style={{ animationDelay: '0.1s' }}>
                  <span className="text-3xl font-black tracking-tighter uppercase cursor-pointer" onClick={() => { setMenuOpen(false); navigate("/"); }}>
                    MiniX
                  </span>
                  <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest leading-relaxed mt-1 hidden sm:block">
                    Minimal outside.<br/>Loud inside.
                  </span>
                  <button onClick={() => setMenuOpen(false)} className="lg:hidden ml-auto text-[10px] font-bold font-mono uppercase tracking-[0.2em] flex items-center gap-3 hover:text-zinc-400 transition-colors">
                    Close <X size={16} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Main Links */}
                <div className="relative z-10 flex flex-col gap-6 lg:gap-10 my-10 shrink-0">
                  {mainLinks.map((link, i) => (
                    <div key={link.name} className="flex items-center gap-6 lg:gap-12 group cursor-pointer animate-stagger" style={{ animationDelay: `${0.15 + (i * 0.08)}s` }} onClick={() => { setMenuOpen(false); navigate(link.path); }}>
                      <span className="text-xs font-mono text-zinc-600 w-6 hidden md:block">0{i + 1}</span>
                      <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter text-zinc-400 group-hover:text-white transition-colors duration-300 m-0 leading-none">
                        {link.name}
                      </h2>
                      <div className="hidden lg:flex items-center gap-2 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-zinc-500">
                        <span className="text-[10px] font-mono whitespace-pre-line leading-tight">
                          {link.desc}
                        </span>
                        <ArrowUpRight size={14} className="ml-1" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Left Panel Footer */}
                <div className="relative z-10 flex justify-between items-end animate-stagger shrink-0" style={{ animationDelay: '0.5s' }}>
                  <div className="flex gap-6 items-center">
                    <div className="w-32 h-20 rounded border border-zinc-800 overflow-hidden relative opacity-70">
                      <img src="/Hero.jpg" className="w-full h-full object-cover" alt="Thumbnail" />
                    </div>
                    <div className="hidden md:flex flex-col">
                      <span className="text-zinc-500 font-serif text-2xl leading-none">“</span>
                      <p className="text-xs text-zinc-400 max-w-[200px] leading-relaxed -mt-2">
                        Built for people who feel everything deeply, but say very little.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-1 text-zinc-500 opacity-60">
                    <Barcode size={32} strokeWidth={1} />
                    <span className="text-[9px] font-mono tracking-[0.3em]">M N X 2 0 2 6</span>
                  </div>
                </div>
              </div>

              {/* RIGHT PANEL */}
              <div className="w-full lg:w-[35%] h-full bg-[#121212] flex flex-col p-8 lg:p-12 overflow-y-auto">
                <div className="hidden lg:flex justify-end mb-12 lg:mb-16 shrink-0 animate-stagger" style={{ animationDelay: '0.1s' }}>
                  <button onClick={() => setMenuOpen(false)} className="text-[10px] font-bold font-mono uppercase tracking-[0.2em] flex items-center gap-3 hover:text-zinc-400 transition-colors">
                    Close <X size={16} strokeWidth={1.5} />
                  </button>
                </div>

                <div className="flex flex-col gap-12 shrink-0">
                  {/* MY SPACE */}
                  <div className="animate-stagger" style={{ animationDelay: '0.2s' }}>
                    <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-6 border-b border-[#222] pb-3">My Space</h4>
                    <div className="flex flex-col gap-1">
                      <div className="group flex items-center justify-between py-2 cursor-pointer text-zinc-400 hover:text-white transition-colors" onClick={() => { setMenuOpen(false); navigate("/profile"); }}>
                        <div className="flex items-center gap-4"><User size={16} strokeWidth={1.5} /> <span className="text-sm">Profile</span></div>
                        <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <div className="group flex items-center justify-between py-2 cursor-pointer text-zinc-400 hover:text-white transition-colors" onClick={() => { setMenuOpen(false); navigate("/orders"); }}>
                        <div className="flex items-center gap-4"><ShoppingBag size={16} strokeWidth={1.5} /> <span className="text-sm">Orders</span></div>
                        <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <div className="group flex items-center justify-between py-2 cursor-pointer text-zinc-400 hover:text-white transition-colors" onClick={() => { setMenuOpen(false); navigate("/wishlist"); }}>
                        <div className="flex items-center gap-4"><Heart size={16} strokeWidth={1.5} /> <span className="text-sm">Wishlist</span></div>
                        <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                      <div className="group flex items-center justify-between py-2 cursor-pointer text-zinc-400 hover:text-white transition-colors" onClick={() => { setMenuOpen(false); navigate("/wishlist"); }}>
                        <div className="flex items-center gap-4"><Bookmark size={16} strokeWidth={1.5} /> <span className="text-sm">Saved Pieces</span></div>
                        <ChevronRight size={14} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </div>
                    </div>
                  </div>

                  {/* FEATURED DROP */}
                  <div className="animate-stagger" style={{ animationDelay: '0.3s' }}>
                    <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-6 border-b border-[#222] pb-3">Featured Drop</h4>
                    <div className="group relative w-full h-40 rounded bg-zinc-900 overflow-hidden cursor-pointer" onClick={() => { setMenuOpen(false); navigate("/shop"); }}>
                      <img src="/Hero.jpg" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-700" alt="Drop" />
                      <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent p-6 flex flex-col justify-center">
                        <span className="text-[9px] font-mono text-zinc-400 uppercase tracking-widest mb-1">Chapter 02</span>
                        <span className="text-xl font-medium text-white leading-tight mb-4">Shadow<br/>Uniform</span>
                        <span className="text-[9px] font-mono text-zinc-300 uppercase tracking-widest flex items-center gap-2">Explore Drop <ArrowUpRight size={12} /></span>
                      </div>
                    </div>
                  </div>

                  {/* CONNECT */}
                  <div className="animate-stagger" style={{ animationDelay: '0.4s' }}>
                    <h4 className="text-[9px] font-mono uppercase tracking-[0.2em] text-zinc-500 mb-6 border-b border-[#222] pb-3">Connect</h4>
                    <div className="flex flex-wrap gap-6 text-zinc-400">
                      <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Instagram size={14} /> <span className="text-xs">Instagram</span></a>
                      <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Twitter size={14} /> <span className="text-xs">Twitter / X</span></a>
                      <a href="#" className="flex items-center gap-2 hover:text-white transition-colors"><Youtube size={14} /> <span className="text-xs">YouTube</span></a>
                    </div>
                  </div>

                  {/* JOIN LIST */}
                  <div className="animate-stagger mt-auto" style={{ animationDelay: '0.5s' }}>
                    <div className="border border-[#222] rounded p-4 flex items-center justify-between hover:bg-[#1a1a1a] transition-colors cursor-pointer">
                      <div className="flex items-center gap-4">
                        <Mail size={16} className="text-zinc-400" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300">Join the MiniX List</span>
                          <span className="text-[10px] text-zinc-500 mt-0.5">Early access. First drops. No noise.</span>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-zinc-500" />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* GLOBAL FOOTER BAR */}
            <div className="hidden lg:flex h-[50px] border-t border-[#1a1a1a] items-center justify-between px-6 lg:px-12 text-[9px] font-mono uppercase tracking-widest text-zinc-600 shrink-0">
              <span>© 2026 MINIX. All rights reserved.</span>
              <span className="text-zinc-500">Comfort is everything.</span>
              <span>Worldwide</span>
            </div>
          </motion.div>,
          document.body
        )}
      </AnimatePresence>
    </>
  );
}
