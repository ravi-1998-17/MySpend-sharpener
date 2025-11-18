import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Header from "./components/layout/Header";
import LoginPage from "./pages/login/LoginPage";
import Profile from "./pages/profile/Profile";
import ProfileAlert from "./pages/profile/ProfileAlert";
import Portal from "./components/common/Portal";
import { PageLoader } from "./components/common/StatsComps";

const App = () => {
  const { isLoggedIn, isAuthChecked } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode); // ⬅ added
  const [isProfileComplete, setIsProfileComplete] = useState(false);
  const [showProfileAlert, setShowProfileAlert] = useState(false);
  const location = useLocation();

  // ⬅ Apply theme to body
  useEffect(() => {
    document.body.classList.remove("light-theme", "dark-theme");
    document.body.classList.add(theme === "dark" ? "dark-theme" : "light-theme");
  }, [theme]);

  useEffect(() => {
    if (isLoggedIn && !isProfileComplete) {
      const timer = setTimeout(() => setShowProfileAlert(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn, isProfileComplete]);

  const isProfilePage = location.pathname === "/profile";

  if (!isAuthChecked) return <PageLoader />;
  if (!isLoggedIn) return <LoginPage />;

  return (
    <>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {showProfileAlert && !isProfileComplete && !isProfilePage && (
        <Portal>
          <ProfileAlert />
        </Portal>
      )}
    </>
  );
};

export default App;
