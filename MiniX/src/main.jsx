// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import ProfilePage from "./pages/ProfilePage";
import App from "./App.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import Shop from "./pages/Shop.jsx";
import Contact from "./pages/Contact.jsx";
import About from "./pages/About.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderSuccess from "./pages/OrderSuccess.jsx";
import AuthPage from "./pages/AuthPage.jsx";
import WishlistPage from "./pages/WishlistPage.jsx";


import "./index.css";

import { CartProvider } from "./context/CartContext.jsx";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

import PageTransition from "./Components/PageTransition.jsx";

// -------- Protected Route Wrapper --------
function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null; // can add loader later

  return user ? children : <Navigate to="/auth" replace />;
}

// -------- Prevent visiting /auth when logged in --------
function BlockAuthWhenLoggedIn({ children }) {
  const { user, loading } = useAuth();
  if (loading) return null;

  return user ? <Navigate to="/" replace /> : children;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><App /></PageTransition>} />

        <Route path="/shop" element={<PageTransition><Shop /></PageTransition>} />

        <Route path="/product/:id" element={<PageTransition><ProductPage /></PageTransition>} />

        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />

        <Route path="/about" element={<PageTransition><About /></PageTransition>} />

        <Route path="/profile" element={<PageTransition><ProfilePage /></PageTransition>} />


        {/* 🔒 Protected */}
        <Route path="/cart" element={
          <ProtectedRoute>
            <PageTransition><Cart /></PageTransition>
          </ProtectedRoute>
        } />

        <Route path="/wishlist" element={
          <ProtectedRoute>
            <PageTransition><WishlistPage /></PageTransition>
          </ProtectedRoute>
        } />

        <Route path="/checkout" element={
          <ProtectedRoute>
            <PageTransition><Checkout /></PageTransition>
          </ProtectedRoute>
        } />

        <Route path="/order-success" element={
          <ProtectedRoute>
            <PageTransition><OrderSuccess /></PageTransition>
          </ProtectedRoute>
        } />

        {/* 🔒 Block /auth if already logged in */}
        <Route path="/auth" element={
          <BlockAuthWhenLoggedIn>
            <PageTransition><AuthPage /></PageTransition>
          </BlockAuthWhenLoggedIn>
        } />
      </Routes>
    </AnimatePresence>
  );
}

// -------------------------
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <AnimatedRoutes />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
