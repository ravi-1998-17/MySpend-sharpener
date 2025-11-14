import { PageLoader } from "@/components/common/StatsComps";
import React, { createContext, useEffect, useState } from "react";

// Create context
export const AuthContext = createContext();

// AuthProvider
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  // Load token & email from localStorage
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedEmail = localStorage.getItem("email");

    if (savedToken && savedEmail) {
      setToken(savedToken);
      setUserEmail(savedEmail);
      setIsLoggedIn(true);
    }

    setIsAuthChecked(true);
  }, []);

  // Login function
  const login = (token, email) => {
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    setToken(token);
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setToken(null);
    setUserEmail(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, userEmail, login, logout }}>
      {isAuthChecked ? children : <PageLoader />}
    </AuthContext.Provider>
  );
};
