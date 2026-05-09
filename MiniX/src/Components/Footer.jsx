import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribeMessage, setSubscribeMessage] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribeMessage("System updated. Access granted.");
      setEmail("");
      setTimeout(() => setSubscribeMessage(""), 3000);
    } else {
      setSubscribeMessage("Invalid syntax.");
      setTimeout(() => setSubscribeMessage(""), 3000);
    }
  };

  return (
    <footer className="bg-[#1e1f22] text-white pt-24 pb-12 mt-0 border-t border-[#47484c] selection:bg-[#4c4e51] selection:text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-12 gap-16">

        {/* Brand & Connect */}
        <div className="md:col-span-4 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 text-white">MiniX</h2>
            <p className="text-[#4c4e51] font-mono text-xs uppercase tracking-widest max-w-xs leading-relaxed mb-8">
              Engineered for the future. Advanced kinematics and brutalist aesthetics.
            </p>
          </div>
          
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mb-4">Comms</h3>
            <ul className="space-y-2 text-[#4c4e51] font-mono text-xs uppercase tracking-widest mb-8">
              <li>
                <a href="mailto:support@minix.com" className="hover:text-white transition-colors">
                  support@minix.com
                </a>
              </li>
              <li>
                <a href="tel:+919876543210" className="hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </li>
            </ul>

            <div className="flex gap-6 text-xl">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-[#4c4e51] hover:text-white transition-colors">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#4c4e51] hover:text-white transition-colors">
                <FaTwitter />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-[#4c4e51] hover:text-white transition-colors">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="md:col-span-4 grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mb-6">Support</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-[#4c4e51]">
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/orders" className="hover:text-white transition-colors">Track Orders</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Shipping</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Returns</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mb-6">Index</h3>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-[#4c4e51]">
              <li><Link to="/shop" className="hover:text-white transition-colors">Archive</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Lore</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Legal</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="md:col-span-4">
          <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/50 mb-4">Initialize Sequence</h3>
          <p className="text-[#4c4e51] font-mono text-xs uppercase tracking-widest leading-relaxed mb-6">
            Input clearance code for early access to classified drops.
          </p>

          <form onSubmit={handleSubscribe} className="relative w-full">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#1e2023] border border-[#47484c] text-white text-xs font-mono uppercase tracking-widest px-4 py-4 focus:border-white focus:outline-none transition-colors"
              placeholder="ENTER PROTOCOL (EMAIL)"
              required
            />
            <button
              type="submit"
              className="absolute right-0 top-0 h-full px-6 bg-white text-black font-bold text-xs uppercase tracking-widest hover:bg-[#4c4e51] hover:text-white transition-colors"
            >
              Sync
            </button>
            {subscribeMessage && (
              <p className="absolute -bottom-6 left-0 text-[10px] font-mono uppercase tracking-widest text-green-400">
                {subscribeMessage}
              </p>
            )}
          </form>
        </div>

      </div>

      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 mt-24 pt-8 border-t border-[#47484c] flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[#4c4e51] font-mono text-[10px] uppercase tracking-widest">
          © {new Date().getFullYear()} MiniX. All systems nominal.
        </p>
        <p className="text-[#4c4e51] font-mono text-[10px] uppercase tracking-widest">
          Designed for the future.
        </p>
      </div>
    </footer>
  );
}
