import React, { useState, useRef } from "react";
import { Form, Button, Spinner, Container } from "react-bootstrap";
import classes from "../authentication/Auth.module.css";
import { LoaderSmall } from "../common/StatsComps";

function Auth({ setIsLoggedIn }) {
  
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const switchModeHandler = () => {
    setIsLogin((prev) => !prev);
    setError("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current?.value;

    try {
      let url;
      if (isLogin) {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE";
      } else {
        url =
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE";
      }

      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
          returnSecureToken: true,
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error?.message || "Authentication failed!");

      localStorage.setItem("token", data.idToken);
      setIsLoggedIn(true);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <Container fluid className={`${classes.authContainer}`}>
      <Form onSubmit={submitHandler} className={classes.authForm}>
        <div className={classes.welcome}>
          <h2 className={classes.title}>
            {isLogin ? "Hello, Again" : "Create Your Account"}
          </h2>
          <hr />
          <p className={classes.subtitle}>
            <span></span>
            {isLogin
              ? "We are happy to have you back."
              : "Join us and get started in seconds!"}
          </p>
        </div>
        <div className={classes.formFields}>
          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                ref={nameRef}
                required
                className={classes.inputFields}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
              className={classes.inputFields}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
              className={classes.inputFields}
            />
          </Form.Group>
        </div>

        {error && (
          <p className="text-center" style={{ color: "var(--pink)" }}>
            {error}
          </p>
        )}

        {loading ? (
          <LoaderSmall text="Requesting..."/>
        ) : (
          <Button type="submit" className={classes.submitBtn}>
            {isLogin ? "Login" : "Sign Up"}
          </Button>
        )}

        <div className="text-center mt-5">
          {isLogin ? (
            <p>
              Don’t have an account?{" "}
              <span className={classes.switchText} onClick={switchModeHandler}>
                Create Account
              </span>
            </p>
          ) : (
            <p>
              Have an account?{" "}
              <span className={classes.switchText} onClick={switchModeHandler}>
                Login
              </span>
            </p>
          )}
        </div>
      </Form>
    </Container>
  );
}

export default Auth;
