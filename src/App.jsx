import { Route, Routes } from "react-router-dom";
import "./App.css";

import { useContext, useEffect, useState } from "react";
import Home from "./pages/home/Home";
import About from "./pages/about/About";
import Contact from "./pages/contact/Contact";
import Header from "./components/layout/Header";
import LoginPage from "./pages/login/LoginPage";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn) return <LoginPage />;

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </>
  );
};

export default App;
