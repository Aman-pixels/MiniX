import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#060606] text-white pt-20 pb-10 mt-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* Stay Updated */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-5">
            Get updates on new drops & exclusive member-only offers.
          </p>

          <div className="flex w-full max-w-sm">
            <input
              className="flex-1 bg-black/40 border border-white/20 px-4 py-2 rounded-l-lg text-sm focus:border-white"
              placeholder="Enter your email"
            />
            <button className="bg-white text-black px-5 py-2 rounded-r-lg font-semibold text-sm hover:bg-gray-200 transition">
              GO
            </button>
          </div>
        </div>

        {/* Customer Support */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Customer Support</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>Contact Us</li>
            <li>Track Orders</li>
            <li>Shipping</li>
            <li>Returns</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Company</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>About Us</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Connect With Us</h3>

          <ul className="space-y-2 text-gray-400 text-sm mb-5">
            <li>📧 support@minix.com</li>
            <li>📞 +91 98765 43210</li>
            <li>📍 Bangalore, India</li>
          </ul>

          {/* SOCIAL ICONS ONLY — COLORED */}
          <div className="flex gap-5 text-2xl">
            <FaInstagram className="hover:scale-110 transition cursor-pointer text-[#E1306C]" />
            <FaFacebook className="hover:scale-110 transition cursor-pointer text-[#1877F2]" />
            <FaYoutube className="hover:scale-110 transition cursor-pointer text-[#FF0000]" />
            <FaTwitter className="hover:scale-110 transition cursor-pointer text-[#1DA1F2]" />
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-xs mt-16">
        © 2025 <span className="font-semibold">MiniX</span> — All rights reserved.
      </p>
    </footer>
  );
}
