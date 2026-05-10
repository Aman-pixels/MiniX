import React, { useRef, useState } from "react";
import useSEO from "../hooks/useSEO";
import { motion } from "framer-motion";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import API_BASE_URL from "../config";
import { 
  Zap, 
  ArrowUpRight, 
  CheckCircle2, 
  Mail, 
  Clock, 
  MapPin, 
  Globe, 
  ChevronDown 
} from "lucide-react";

export default function Contact() {
  useSEO({
    title: "Contact Us",
    description:
      "Get in touch with the MiniX team. Have a question about your order, a product, or just want to say hello? We'd love to hear from you.",
    url: "/contact",
  });
  
  const form = useRef();
  const [status, setStatus] = useState({ type: "", message: "" });
  const [charCount, setCharCount] = useState(0);

  // ✉️ Function to send email
  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Sending your message..." });

    const formData = new FormData(form.current);
    const data = {
      user_name: formData.get("user_name"),
      user_email: formData.get("user_email"),
      subject: formData.get("subject"),
      message: formData.get("message"),
    };

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: "Message sent successfully! We'll be in touch." });
        form.current.reset();
        setCharCount(0);
      } else {
        throw new Error(result.message || "Failed to send");
      }
    } catch (error) {
      console.error("Email Error:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-inter selection:bg-white selection:text-black flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-[1500px] w-full mx-auto px-6 lg:px-12 pt-32 lg:pt-40 pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-12"
        >
          
          {/* LEFT COLUMN: Typography & Image */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-16 lg:space-y-0">
            <div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase mb-8 block">
                Contact Us
              </span>
              <h1 className="text-6xl sm:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.9] mb-8">
                Let's <br />
                <span className="text-zinc-600">Connect</span>
              </h1>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-[280px]">
                We're here to help, collaborate, or just talk about ideas that matter.<br />
                Drop us a message — we'll get back soon.
              </p>
            </div>

            {/* Image & Quote */}
            <div className="relative mt-12 lg:mt-0 max-w-sm hidden lg:block">
              <div className="w-full h-[480px] rounded-2xl overflow-hidden relative border border-white/5">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent z-10" />
                <img 
                  src="/Hero.jpg" 
                  alt="MiniX Contact" 
                  className="w-full h-full object-cover object-center mix-blend-luminosity opacity-40 grayscale" 
                />
                
                {/* Quote on top of image */}
                <div className="absolute bottom-8 left-8 right-8 z-20">
                  <span className="text-zinc-600 font-serif text-5xl leading-none block mb-4">“</span>
                  <p className="text-[11px] text-zinc-400 leading-relaxed mb-6">
                    Behind every piece is<br />
                    a person who cares.<br />
                    Behind every message<br />
                    is a conversation<br />
                    that matters.
                  </p>
                  {/* Signature graphic (SVG) */}
                  <svg width="80" height="30" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-50">
                    <path d="M10 25C15 15 20 5 30 10C40 15 25 35 35 30C45 25 50 15 60 20C70 25 65 35 75 30C85 25 90 15 95 20" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M25 20L45 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* MIDDLE COLUMN: Form */}
          <div className="lg:col-span-5 relative">
            <div className="bg-[#0c0c0c] border border-white/5 rounded-3xl p-8 sm:p-10 lg:p-12 shadow-2xl relative z-10">
              
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full mb-10">
                <Zap size={12} className="text-zinc-400" />
                <span className="text-[9px] font-mono tracking-widest text-zinc-400 uppercase">We reply fast</span>
              </div>

              <h2 className="text-3xl font-medium tracking-tight mb-3">
                Send us <span className="text-zinc-500">a message</span> 👋
              </h2>
              <p className="text-sm text-zinc-500 mb-10">
                Fill in the form or email us directly at <br />
                <a href="mailto:hello@minix.com" className="text-zinc-300 hover:text-white transition-colors">hello@minix.com</a>
              </p>

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 block">Your Name</label>
                    <input 
                      type="text" 
                      name="user_name"
                      required
                      placeholder="Aman"
                      className="w-full bg-[#121212] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
                    />
                  </div>
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-zinc-400 block">Your Email</label>
                    <input 
                      type="email" 
                      name="user_email"
                      required
                      placeholder="amankundal@gmail.com"
                      className="w-full bg-[#121212] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="text-xs font-medium text-zinc-400 block">Subject</label>
                  <div className="relative">
                    <select 
                      name="subject"
                      className="w-full bg-[#121212] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-white/20 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="General Inquiry">General Inquiry</option>
                      <option value="Order Support">Order Support</option>
                      <option value="Collab / Press">Collab / Press</option>
                      <option value="Feedback">Feedback</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none" />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2 relative">
                  <label className="text-xs font-medium text-zinc-400 block">Message</label>
                  <textarea 
                    name="message"
                    required
                    rows="5"
                    maxLength={1000}
                    onChange={(e) => setCharCount(e.target.value.length)}
                    placeholder="hiii"
                    className="w-full bg-[#121212] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/20 transition-colors resize-none"
                  ></textarea>
                  <div className="absolute bottom-4 right-4 text-[10px] font-mono text-zinc-600">
                    {charCount} / 1000
                  </div>
                </div>

                {/* Submit */}
                <button 
                  type="submit"
                  disabled={status.type === "loading"}
                  className="w-full bg-white text-black font-medium py-4 rounded-xl flex items-center justify-center gap-2 hover:bg-zinc-200 transition-colors disabled:opacity-50 mt-4"
                >
                  {status.type === "loading" ? "Sending..." : "Send Message"}
                  {status.type !== "loading" && <ArrowUpRight size={18} strokeWidth={2} />}
                </button>
                
                {status.message && (
                  <p className={`text-center text-sm mt-4 ${status.type === "success" ? "text-emerald-400" : "text-red-400"}`}>
                    {status.message}
                  </p>
                )}

                {/* Footer Text */}
                <div className="flex items-center justify-center gap-2 pt-6 mt-6 border-t border-white/5">
                  <CheckCircle2 size={12} className="text-zinc-500" />
                  <span className="text-[9px] text-zinc-500 uppercase tracking-widest font-mono">We'll get back to you within 24 hours.</span>
                </div>
              </form>
            </div>
          </div>

          {/* RIGHT COLUMN: Contact Info */}
          <div className="lg:col-span-3 flex flex-col gap-12 lg:pt-8 pl-0 lg:pl-6">
            
            <div className="space-y-8">
              <h3 className="text-[13px] font-medium text-white">Other ways to reach us</h3>
              
              <div className="space-y-8">
                {/* Contact Item */}
                <div className="flex gap-4 items-start">
                  <div className="mt-0.5 shrink-0">
                    <Mail size={16} className="text-zinc-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-medium text-zinc-200 mb-1">Email</h4>
                    <a href="mailto:hello@minix.com" className="text-[13px] text-zinc-500 hover:text-white transition-colors">hello@minix.com</a>
                  </div>
                </div>

                {/* Contact Item */}
                <div className="flex gap-4 items-start">
                  <div className="mt-0.5 shrink-0">
                    <Clock size={16} className="text-zinc-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-medium text-zinc-200 mb-1">Response Time</h4>
                    <p className="text-[13px] text-zinc-500">Within 24 hours</p>
                  </div>
                </div>

                {/* Contact Item */}
                <div className="flex gap-4 items-start">
                  <div className="mt-0.5 shrink-0">
                    <MapPin size={16} className="text-zinc-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-medium text-zinc-200 mb-1">Headquarters</h4>
                    <p className="text-[13px] text-zinc-500">India</p>
                  </div>
                </div>

                {/* Contact Item */}
                <div className="flex gap-4 items-start">
                  <div className="mt-0.5 shrink-0">
                    <Globe size={16} className="text-zinc-400" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[13px] font-medium text-zinc-200 mb-1">Worldwide Shipping</h4>
                    <p className="text-[13px] text-zinc-500">To most countries</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dark Box */}
            <div className="bg-[#0c0c0c] border border-white/5 rounded-2xl p-6 mt-auto shadow-xl">
              <h3 className="text-[15px] font-medium text-white leading-snug mb-4 pr-4">
                We value real conversations.
              </h3>
              <p className="text-[13px] text-zinc-400 leading-relaxed mb-8">
                Whether it's feedback, collab ideas, questions, or just a hello — we're all ears.
              </p>
              <a href="#" className="text-[11px] text-zinc-300 border-b border-zinc-700 pb-0.5 hover:border-white hover:text-white transition-colors inline-flex items-center gap-1.5 font-medium">
                Thanks for being here. <ArrowUpRight size={12} />
              </a>
            </div>

          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
