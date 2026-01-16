import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext(null);

const API_URL = "http://localhost:5000/api/cart";

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuth();

  // Helper to format backend data for frontend
  const processCartData = (apiCartItems) => {
    return apiCartItems.map((item) => ({
      ...item.product, // Spread product details (name, price, images, slug)
      id: item.product._id, // Ensure ID matches what frontend expects
      // We might need to keep the original item structure for some logic, but flattening is safer for existing UI
      quantity: item.quantity,
      selectedSize: item.selectedSize,
      selectedColor: item.selectedColor,
      product: item.product, // Keep original nested product if needed
    }));
  };

  useEffect(() => {
    if (user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [user]);

  const fetchCart = async () => {
    try {
      const { data } = await axios.get(API_URL, {
        withCredentials: true,
      });
      if (data.success) {
        setCartItems(processCartData(data.cart));
      }
    } catch (error) {
      console.error("Failed to fetch cart", error);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const { data } = await axios.post(
        `${API_URL}/add`,
        {
          productId: product.id,
          quantity: product.quantity || 1,
          selectedSize: product.selectedSize,
          selectedColor: product.selectedColor,
        },
        { withCredentials: true }
      );

      if (data.success) {
        setCartItems(processCartData(data.cart));
      }
    } catch (error) {
      console.error("Add to cart error", error);
      alert("Failed to add to cart");
    }
  };

  const updateQuantity = async (id, delta) => {
    if (!user) return;

    // Find the item in local state to get its variant details
    // id could be just product ID, which is ambiguous if multiple variants exist.
    // However, existing UI seems to pass product ID.
    // We'll try to find the FIRST matching item for now, or we should fix the UI to pass more unique IDs.
    // Best effort:
    const targetItem = cartItems.find((item) => item.id === id);

    if (!targetItem) return;

    const newQuantity = Math.max(1, targetItem.quantity + delta);

    try {
      const { data } = await axios.put(
        `${API_URL}/update`,
        {
          productId: targetItem.product._id,
          selectedSize: targetItem.selectedSize,
          selectedColor: targetItem.selectedColor,
          quantity: newQuantity,
        },
        { withCredentials: true }
      );

      if (data.success) {
        setCartItems(processCartData(data.cart));
      }
    } catch (error) {
      console.error("Update quantity error", error);
    }
  };

  // Original UI calls removeFromCart(item.id)
  const removeFromCart = async (id) => {
    if (!user) return;

    const targetItem = cartItems.find((item) => item.id === id);
    if (!targetItem) return;

    try {
      const { data } = await axios.post(
        `${API_URL}/remove`,
        {
          productId: targetItem.product._id,
          selectedSize: targetItem.selectedSize,
          selectedColor: targetItem.selectedColor,
        },
        { withCredentials: true }
      );

      if (data.success) {
        setCartItems(processCartData(data.cart));
      }
    } catch (error) {
      console.error("Remove from cart error", error);
    }
  };

  const clearCart = async () => {
    if (!user) return;
    try {
      const { data } = await axios.delete(`${API_URL}/clear`, {
        withCredentials: true,
      });
      if (data.success) {
        setCartItems([]);
      }
    } catch (error) {
      console.error("Clear cart error", error);
    }
  };

  const total = useMemo(() => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}
