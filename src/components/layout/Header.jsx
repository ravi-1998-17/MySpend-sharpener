// components/layout/Header.jsx
import React from "react";
import { Container, Nav, Navbar, Image, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import LogoutButton from "../common/LogoutButton";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/store/slices/themeSlice";

function Header() {
  const { email, photo } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  const navbarStyle = {
    backgroundColor: theme === "dark" ? "#2f2f2f" : "#f5f5f5",
    color: theme === "dark" ? "#fff" : "#2f2f2f",
    padding: "0.75rem 0",
  };

  const linkColor = theme === "dark" ? "#fff" : "#2f2f2f";

  return (
    <Navbar expand="lg" style={navbarStyle} className="sticky-top">
      <Container className="d-flex align-items-center justify-content-between px-3">
        {/* LOGO */}
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={{
            fontSize: "1.5rem",
            fontWeight: 600,
            color: theme === "dark" ? "#4586fd" : "#2b71fe",
            textDecoration: "none",
          }}
        >
          MySpend
        </Navbar.Brand>

        {/* NAV LINKS */}
        <Navbar.Collapse className="d-flex justify-content-center flex-grow-1">
          <Nav className="gap-3 fs-5">
            <Nav.Link
              as={NavLink}
              to="/"
              end
              style={{ color: linkColor, textDecoration: "none" }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/about"
              style={{ color: linkColor, textDecoration: "none" }}
            >
              About
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              style={{ color: linkColor, textDecoration: "none" }}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        {/* RIGHT: THEME + PROFILE + LOGOUT */}
        <div className="d-flex align-items-center gap-2">
          {/* THEME TOGGLE */}
          <Button
            onClick={() => dispatch(toggleTheme())}
            style={{
              borderRadius: "50%",
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: theme === "dark" ? "#444" : "#eee",
              color: theme === "dark" ? "#fff" : "#2f2f2f",
              border: "none",
            }}
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </Button>

          {/* PROFILE */}
          {email && (
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Image
                src={photo || "https://via.placeholder.com/40?text=👤"}
                roundedCircle
                width="40"
                height="40"
              />
              <span style={{ color: linkColor, fontWeight: 500 }}>{email}</span>
            </div>
          )}

          {/* LOGOUT */}
          <LogoutButton />
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
