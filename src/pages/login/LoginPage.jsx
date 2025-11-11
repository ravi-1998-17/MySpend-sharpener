import Auth from "@/components/authentication/Auth";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import classes from "./LoginPage.module.css";

function LoginPage({ setIsLoggedIn }) {
  return (
    <div className={classes.loginContainer}>
        <Col className={classes.leftSide}>
            <i className="bi bi-piggy-bank-fill"></i>
            <div>
              <h1>Your Finances, Simplified</h1>
              <hr
                style={{ width: "20%", margin: "1rem auto", height: ".5rem" }}
              />
              <p>
                Stay mindful of your spending habits and take small <br /> steps
                toward smarter saving.
              </p>
            </div>
        </Col>
        <Col>
          <div>
            <Auth setIsLoggedIn={setIsLoggedIn} />
          </div>
        </Col>
    </div>
  );
}

export default LoginPage;
