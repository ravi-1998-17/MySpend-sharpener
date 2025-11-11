import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import classes from "../layout/Header.module.css";

function Header() {
  return (
    <Navbar
      expand="lg"
      className="py-3 sticky-top"
      style={{ backgroundColor: "var(--grey)" }}
    >
      <Container className="px-3">
        <Navbar.Brand
          as={NavLink}
          to="/"
          className={`fs-3 fw-semibold ${classes.logo}`}
        >
          MySpend
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="navbar-collapse"
          className="border-0 shadow-none custom-toggle"
        />

        <Navbar.Collapse id="navbar-collapse" className="justify-content-end">
          <Nav className="gap-3 fs-5">
            <Nav.Link as={NavLink} to="/" end className={`${classes.navLink}`}>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/about" className={`${classes.navLink}`}>
              About
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              to="/contact"
              className={`${classes.navLink}`}
            >
              Contact
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
