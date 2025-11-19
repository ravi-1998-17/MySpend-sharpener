import React from "react";
import Auth from "@/components/authentication/Auth";
import classes from "./LoginPage.module.css";

function LoginPage({ setIsLoggedIn }) {
  return (
    <div className={classes.loginContainer}>
      {/* LEFT SIDE */}
      <div className={classes.leftSide}>
        <i className="bi bi-piggy-bank-fill"></i>

        <div className={classes.textBox}>
          <h1>Your Finances, Simplified</h1>
          <div className={classes.line}></div>
          <p>
            Stay mindful of your spending habits and take small<br />
            steps toward smarter saving.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE - AUTH BOX */}
      <div className={classes.rightSide}>
        <Auth setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
}

export default LoginPage;
