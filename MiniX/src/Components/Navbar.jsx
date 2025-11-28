import React, { useState, useEffect } from "react";
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

export default function Navbar() {
  const { cartItems } = useCart();
  const { wishlist } = useWishlist();
  const { user, logoutUser } = useAuth();

  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 w-full z-50
          transition-all duration-300
          ${scrolled ? "bg-black/80 backdrop-blur-xl py-3" : "bg-transparent py-5"}
        `}
      >
        <div
          className="
            max-w-[1250px]
            mx-auto 
            px-6 
            flex 
            items-center 
            justify-between
            gap-6
          "
        >
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
                to={`/${link}`}
                className={({ isActive }) =>
                  `capitalize hover:text-white transition ${
                    isActive ? "text-white font-semibold" : ""
                  }`
                }
              >
                {link}
              </NavLink>
            ))}
          </ul>

          {/* SEARCH BAR */}
          <div className="hidden md:flex items-center relative w-64">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60"
            />
            <input
              type="text"
              placeholder="Search products..."
              className="
                w-full 
                bg-white/10 
                border border-white/20 
                rounded-xl 
                py-2 pl-10 pr-3 
                text-sm text-white 
                placeholder-white/50
                focus:border-white 
                transition
              "
            />
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-6">

            {/* USER PROFILE DROPDOWN */}
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
                      absolute right-0 mt-3 
                      bg-black/90 
                      border border-white/20 
                      backdrop-blur-xl 
                      p-4 
                      rounded-xl 
                      w-48 
                      shadow-lg
                    "
                  >
                    {user ? (
                      <>
                        <p className="text-white/80 text-sm mb-3">
                          Logged in as <span className="font-medium text-white">{user.name}</span>
                        </p>

                        <button
                          onClick={() => navigate("/profile")}
                          className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2"
                        >
                          <User size={16} /> My Profile
                        </button>

                        <button
                          onClick={() => navigate("/orders")}
                          className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2"
                        >
                          <Package size={16} /> Orders
                        </button>

                        <button
                          onClick={() => navigate("/wishlist")}
                          className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2"
                        >
                          <Heart size={16} /> Wishlist
                        </button>

                        <button
                          onClick={() => navigate("/addresses")}
                          className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2"
                        >
                          <MapPin size={16} /> Addresses
                        </button>

                        <button
                          onClick={() => navigate("/payments")}
                          className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2"
                        >
                          <CreditCard size={16} /> Saved Payments
                        </button>

                        <button
                          onClick={logoutUser}
                          className="flex items-center gap-2 text-red-400 hover:text-red-300 text-sm mt-2"
                        >
                          <LogOut size={16} /> Logout
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => navigate("/auth")}
                          className="flex items-center gap-2 text-white hover:text-gray-300 text-sm mb-2"
                        >
                          <LogIn size={16} /> Login / Sign Up
                        </button>

                        <button
                          onClick={() => navigate("/track-order")}
                          className="flex items-center gap-2 text-white/80 hover:text-white text-sm mb-2"
                        >
                          <Package size={16} /> Track Order
                        </button>

                        <button
                          onClick={() => navigate("/help")}
                          className="flex items-center gap-2 text-white/80 hover:text-white text-sm"
                        >
                          <HelpCircle size={16} /> Help & Support
                        </button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* WISHLIST */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate(user ? "/wishlist" : "/auth")}
            >
              <Heart size={24} />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* CART */}
            <div
              className="relative cursor-pointer"
              onClick={() => navigate(user ? "/cart" : "/auth")}
            >
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
    </>
  );
}
