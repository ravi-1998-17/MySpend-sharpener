// components/layout/Header.jsx
import React from "react";
import { Container, Nav, Navbar, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "@/store/slices/themeSlice";
import { logout } from "@/store/slices/authSlice";

function Header() {
  const { email } = useSelector((state) => state.auth);
  const theme = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  const navbarBg = `var(${theme === "dark" ? "--pink" : "--blue"})`;
  const logoColor = `var(--light)`;
  const linkColor = `var(--light)`;

  const logoutStyles = {
    fontSize: ".85rem",
    padding: "5px 14px",
    borderRadius: "8px",
    transition: "0.3s",
    background: "none",
    color: "var(--light)",
    border: "1px solid var(--light)",
    cursor: "pointer",
  };

  return (
    <Navbar
      expand="lg"
      className="sticky-top"
      style={{ backgroundColor: navbarBg, padding: "1rem 0" }}
    >
      <Container className="d-flex align-items-center justify-content-between px-3">
        {/* LOGO */}
        <Navbar.Brand
          as={NavLink}
          to="/"
          style={{ fontSize: "1.5rem", fontWeight: 300, color: logoColor }}
        >
          MySpend
        </Navbar.Brand>

        <div className="d-flex align-items-center gap-2 d-lg-none">
          {/* Theme Toggle */}
          <Button
            onClick={() => dispatch(toggleTheme())}
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--light)",
            }}
          >
            <i
              className={`bi ${
                theme === "dark" ? "bi-moon" : "bi-brightness-high-fill"
              }`}
              style={{ fontSize: "1.5rem" }}
            ></i>
          </Button>

          {/* Logout */}
          <button
            style={logoutStyles}
            onClick={() => dispatch(logout())}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--blue-light)";
              e.target.style.color =
                theme === "dark" ? "var(--dark)" : "var(--light)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "var(--light)";
            }}
          >
            LOGOUT
          </button>

          {/* Hamburger */}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ border: "none", boxShadow: "none" }}
          />
        </div>

        {/* Navbar Links & User */}
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className="d-flex flex-column flex-lg-row justify-content-center flex-grow-1"
        >
          <Nav className="d-flex flex-column flex-lg-row gap-3 fs-6 w-100 justify-content-center">
            <Nav.Link as={NavLink} to="/" end style={{ color: linkColor }}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" style={{ color: linkColor }}>
              About
            </Nav.Link>
            <Nav.Link as={NavLink} to="/contact" style={{ color: linkColor }}>
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>

        <div className="d-none d-lg-flex align-items-center gap-4">
          <Button
            onClick={() => dispatch(toggleTheme())}
            style={{
              width: 36,
              height: 36,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--light)",
            }}
          >
            <i
              className={`bi ${
                theme === "dark" ? "bi-moon" : "bi-brightness-high-fill"
              }`}
              style={{ fontSize: "1.5rem" }}
            ></i>
          </Button>

          {/* USER */}
          {email && (
            <span style={{ color: linkColor, fontWeight: 500 }}>{email}</span>
          )}

          {/* Logout */}
          <button
            style={logoutStyles}
            onClick={() => dispatch(logout())}
            onMouseEnter={(e) => {
              e.target.style.background = "var(--blue-light)";
              e.target.style.color =
                theme === "dark" ? "var(--dark)" : "var(--light)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "none";
              e.target.style.color = "var(--light)";
            }}
          >
            LOGOUT
          </button>
        </div>
      </Container>
    </Navbar>
  );
}

export default Header;
