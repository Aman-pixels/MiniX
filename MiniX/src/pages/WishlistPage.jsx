import React from "react";
import { useWishlist } from "../context/WishlistContext";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import ProductCard from "../Components/ProductCard";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-[#1e2023] text-white selection:bg-[#4c4e51] selection:text-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 px-6 lg:px-12 max-w-[1400px] mx-auto w-full">
        <div className="flex flex-col mb-16 border-b border-[#47484c] pb-8">
          <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#4c4e51] mb-4">
            System // User
          </p>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9]">
            Saved <br /> Archive
          </h1>
        </div>

        {wishlist.length === 0 ? (
          <div className="h-[40vh] flex flex-col items-center justify-center border border-[#47484c] bg-[#1e1f22]">
            <p className="text-[#4c4e51] font-mono text-xs uppercase tracking-widest mb-6">
              Archive is empty.
            </p>
            <Link 
              to="/shop" 
              className="px-8 py-4 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#4c4e51] hover:text-white transition-colors"
            >
              Access Catalog
            </Link>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {wishlist.map((item, i) => (
              <motion.div
                key={item.id || item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <ProductCard product={item} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>

      <Footer />
    </div>
  );
}
