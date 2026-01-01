import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import productData from "../data/productData";
import { useCart } from "../context/CartContext";

export default function FeaturedProduct() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const featured = productData.slice(0, 4);

  return (
    <section className="w-full bg-black text-white py-20 px-6 lg:px-20">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl md:text-4xl font-bold">
          Featured Products
        </h2>

        <Link
          to="/shop"
          className="text-gray-300 hover:text-white transition text-sm"
        >
          View all products →
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {featured.map((p, i) => (
          <div
            key={p.id}
            className="group bg-white/5 border border-white/10 overflow-hidden rounded-2xl shadow-xl hover:scale-[1.03] transition-all duration-300 backdrop-blur-xl"
          >
            {/* IMAGE */}
            <div
              onClick={() => navigate(`/product/${p.id}`)}
              className="relative overflow-hidden cursor-pointer"
            >
              <img
                src={p.images?.[0]}
                alt={p.name}
                className="w-full h-64 object-cover group-hover:scale-110 transition duration-500"
              />

              {/* Wishlist (placeholder for now) */}
              <button
                onClick={(e) => e.stopPropagation()}
                className="absolute top-3 right-3 bg-black/50 p-2 rounded-full hover:bg-black/70 transition"
              >
                <Heart size={18} className="text-white" />
              </button>
            </div>

            {/* INFO */}
            <div className="p-5 text-center space-y-2">
              <h3
                onClick={() => navigate(`/product/${p.id}`)}
                className="text-lg font-semibold hover:text-gray-200 transition cursor-pointer"
              >
                {p.name}
              </h3>

              <p className="text-gray-400 text-sm">
                ${p.price}
              </p>

              <button
                onClick={() => addToCart(p)}
                className="mt-3 w-full py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
