import Auth from "@/components/authentication/Auth";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./LoginPage.module.css";

function LoginPage({ setIsLoggedIn }) {
  return (
    <div className={classes.loginContainer}>
      {/* LEFT SIDE */}
      <Col className={classes.leftSide}>
        <i className="bi bi-piggy-bank-fill"></i>

        <div className={classes.textBox}>
          <h1>Your Finances, Simplified</h1>

          <div className={classes.line}></div>

          <p>
            Stay mindful of your spending habits and take small<br />
            steps toward smarter saving.
          </p>
        </div>
      </Col>

      {/* RIGHT SIDE - AUTH BOX */}
      <Col className={classes.rightSide}>
        <Auth setIsLoggedIn={setIsLoggedIn} />
      </Col>
    </div>
  );
}

export default LoginPage;
