// src/pages/AuthPage.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../Components/Loader"; // ⭐ custom animation loader

const cardVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -10, scale: 0.98 },
};

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const { user, loading, registerUser, loginUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      const redirectTo = location.state?.from || "/";
      navigate(redirectTo, { replace: true });
    }
  }, [user, loading, location.state, navigate]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { name, email, password } = form;

    if (!email || !password || (activeTab === "register" && !name)) {
      setErrorMsg("Please fill all required fields.");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Password should be at least 6 characters.");
      return;
    }

    try {
      setSubmitting(true);
      if (activeTab === "register") {
        await registerUser(name.trim(), email.trim(), password);
      } else {
        await loginUser(email.trim(), password);
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        (activeTab === "login"
          ? "Login failed. Please check your credentials."
          : "Registration failed. Please try again.");
      setErrorMsg(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab);
    setErrorMsg("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050509] flex items-center justify-center text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="scale-90">
            <Loader />
          </div>
          <p className="text-sm text-white/70">Checking your session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050509] text-white flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-24 w-72 h-72 bg-purple-500/20 blur-[90px]" />
        <div className="absolute -bottom-40 -left-10 w-72 h-72 bg-sky-500/20 blur-[90px]" />
      </div>

      <motion.div
        variants={cardVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.7)] p-6 md:p-7"
      >
        {/* MiniX Branding */}
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-400">
              Welcome to
            </p>
            <h1 className="text-2xl font-semibold tracking-tight">MiniX</h1>
          </div>
          <span className="text-[10px] px-3 py-1 rounded-full border border-white/15 bg-black/40 text-zinc-300">
            Sign in to continue
          </span>
        </div>

        {/* Tabs */}
        <div className="flex mb-5 rounded-full bg-black/40 p-1 border border-white/10">
          <button
            className={`flex-1 py-2 text-sm rounded-full transition ${
              activeTab === "login"
                ? "bg-white text-black font-medium"
                : "text-zinc-400 hover:text-zinc-100"
            }`}
            onClick={() => switchTab("login")}
          >
            Log in
          </button>
          <button
            className={`flex-1 py-2 text-sm rounded-full transition ${
              activeTab === "register"
                ? "bg-white text-black font-medium"
                : "text-zinc-400 hover:text-zinc-100"
            }`}
            onClick={() => switchTab("register")}
          >
            Sign up
          </button>
        </div>

        <p className="text-xs text-zinc-400 mb-4">
          {activeTab === "login"
            ? "Enter your email and password to access your MiniX account."
            : "Create a new MiniX account to save your cart, wishlist & orders."}
        </p>

        {errorMsg && (
          <div className="mb-4 rounded-2xl border border-red-500/40 bg-red-500/10 px-3 py-2 text-xs text-red-200">
            {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <AnimatePresence mode="wait">
            {activeTab === "register" && (
              <motion.div
                key="name-field"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="space-y-1"
              >
                <label className="text-xs text-zinc-400">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="What should we call you?"
                  className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2.5 text-sm outline-none focus:border-white/60 placeholder:text-zinc-500"
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2.5 text-sm outline-none focus:border-white/60 placeholder:text-zinc-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs text-zinc-400">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="At least 6 characters"
              className="w-full rounded-xl bg-black/40 border border-white/15 px-3 py-2.5 text-sm outline-none focus:border-white/60 placeholder:text-zinc-500"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full inline-flex items-center justify-center gap-3 rounded-full bg-white text-black py-2.5 text-sm font-medium shadow-[0_0_40px_rgba(255,255,255,0.2)] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {submitting ? (
              <div className="scale-[0.7]">
                <Loader /> {/* premium circle animation */}
              </div>
            ) : activeTab === "login" ? (
              "Continue"
            ) : (
              "Create account"
            )}
          </button>
        </form>

        <p className="mt-4 text-[11px] text-zinc-500 text-center">
          By continuing, you agree to MiniX&apos;s{" "}
          <span className="underline underline-offset-2 cursor-pointer">
            Terms
          </span>{" "}
          &{" "}
          <span className="underline underline-offset-2 cursor-pointer">
            Privacy Policy
          </span>
          .
        </p>
      </motion.div>
    </div>
  );
}
