import Auth from "@/components/authentication/Auth";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./LoginPage.module.css"; // Use for any custom styles

function LoginPage({ setIsLoggedIn }) {
  return (
    <Container fluid>
      <Row className="d-flex" style={{ minHeight: "100vh" }}>
        <Col xs={6}>
          <div>
            <div style={{height: "30px", width: "30px"}}>
              <i className="bi bi-piggy-bank-fill"></i>
            </div>
            <h1>Your Finances, Simplified</h1>
            <p>
              Stay mindful of your spending habits and take small steps toward
              smarter saving.
            </p>
          </div>
        </Col>
        <Col xs={6}>
          <Auth setIsLoggedIn={setIsLoggedIn} />
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
