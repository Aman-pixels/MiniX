import React from "react";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  const scrollToFeatured = () => {
    const el = document.querySelector("#featured");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    // Reverted background to gradient as requested
    <section className="w-full bg-gradient-to-r from-[#050505] to-[#f6f5f3] py-20 relative overflow-hidden">
      {/* Decorative gradient blob - keep or remove based on "as it was earlier". Keeping it as a nice touch unless it conflicts. */}
      {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 blur-[120px] rounded-full pointer-events-none" /> */}
      <div className="max-w-[1250px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
        {/* LEFT */}
        <div className="text-white">
          <p className="uppercase tracking-widest text-sm text-white/60 mb-3">
            The Best Hoodies Are Only Here
          </p>

          <h1 className="font-extrabold leading-tight text-4xl sm:text-5xl lg:text-6xl mb-4">
            Minimalist <br /> Streetwear <br /> Built For Everyone
          </h1>

          <p className="text-white/70 max-w-md mb-6">
            Discover refined essentials inspired by underground culture.
            Crafted with premium materials & a focus on simplicity.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={scrollToFeatured}
              className="bg-white text-black font-semibold px-6 py-3 rounded-xl shadow-lg hover:scale-[1.04] transition"
            >
              Explore Collections
            </button>

            <button
              onClick={() => navigate("/shop")}
              className="border border-white/20 text-white px-5 py-3 rounded-xl font-semibold hover:bg-white/10 transition"
            >
              Shop Now
            </button>
          </div>

          {/* TAG FILTERS */}
          <div className="flex flex-wrap gap-2">
            {["Hoodies", "Tees", "Bottoms", "Accessories"].map((tag) => (
              <button
                key={tag}
                onClick={() => navigate(`/shop?category=${tag}`)}
                className="px-3 py-1 text-sm border border-white/10 text-white/70 rounded-full hover:bg-white/10 transition"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative flex justify-center lg:justify-end">
          <div className="relative rounded-2xl shadow-2xl overflow-hidden w-full max-w-[440px] transition duration-500 hover:scale-[1.02] border border-black/5">
            <img
              src="/Hero.jpg"
              alt="hero"
              className="w-full h-[480px] object-cover"
            />
          </div>

          {/* FLOATING CARD */}
          <div className="hidden lg:block absolute bottom-6 right-6 glass p-4 rounded-xl border border-white/10 shadow-lg text-right backdrop-blur-md">
            <h4 className="font-bold text-white text-sm">
              New Drop
            </h4>
            <p className="text-gray-400 text-xs mb-2">
              Premium streetwear — limited run
            </p>
            <button
              onClick={() => navigate("/shop")}
              className="font-semibold text-white text-sm hover:underline"
            >
              Discover Now →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
