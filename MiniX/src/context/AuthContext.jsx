// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import API_BASE_URL from "../config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  axios.defaults.baseURL = API_BASE_URL;


  // Auto fetch user on page refresh
  useEffect(() => {
    axios
      .get("/api/auth/me", { withCredentials: true })
      .then((res) => setUser(res.data.user || null))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Register
  const registerUser = async (name, email, password) => {
    await axios.post(
      "/api/auth/register",
      { name, email, password },
      { withCredentials: true }
    );
    return loginUser(email, password);
  };

  // Login
  const loginUser = async (email, password) => {
    const res = await axios.post(
      "/api/auth/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data.user;
  };

  // Update profile (name + email)
  const updateProfile = async (name, email) => {
    const res = await axios.put(
      "/api/user/profile",
      { name, email },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data.user;
  };

  // Update password
  const updatePassword = async (oldPassword, newPassword) => {
    await axios.put(
      "/api/user/password",
      { oldPassword, newPassword },
      { withCredentials: true }
    );
  };

  // Logout
  const logoutUser = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        registerUser,
        loginUser,
        logoutUser,
        updateProfile,
        updatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
