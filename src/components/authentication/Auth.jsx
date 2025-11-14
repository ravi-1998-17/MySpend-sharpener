import React, { useState, useRef, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import classes from "../authentication/Auth.module.css";
import { LoaderSmall } from "../common/StatsComps";
import axios from "axios";
import { AuthContext } from "@/context/AuthContext";

const Auth = () => {
  const { login } = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const switchModeHandler = () => {
    setIsLogin((prev) => !prev);
    setError("");
    setIsForgotPassword(false);
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

      const { data } = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });

      login(data.idToken);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error.message);
      } else {
        setError("Authentication failed. Please try again.");
      }
    }
    setLoading(false);
  };

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const email = emailRef.current.value;

    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE`;

      await axios.post(url, {
        requestType: "PASSWORD_RESET",
        email,
      });

      alert(
        "Password reset link has been sent to your email. Please check your inbox."
      );
      setIsForgotPassword(false);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setError(err.response.data.error.message);
      } else {
        setError("Failed to send reset email. Try again.");
      }
    }

    setLoading(false);
  };

  return (
    <Container fluid className={`${classes.authContainer}`}>
      {isForgotPassword ? (
        <Form onSubmit={forgotPasswordHandler} className={classes.authForm}>
          <div className={classes.welcome}>
            <h2 className={classes.title}>Forgot Password</h2>
            <hr />
            <p className={classes.subtitle}>
              Enter your email and we will send you a reset link.
            </p>
          </div>

          <div className={classes.formFields}>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                ref={emailRef}
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
            <LoaderSmall text="Sending..." />
          ) : (
            <Button type="submit" className={classes.submitBtn}>
              Send Reset Link
            </Button>
          )}

          <div className="text-center mt-3">
            <p
              className={classes.switchText}
              style={{ cursor: "pointer" }}
              onClick={() => setIsForgotPassword(false)}
            >
              Back to Login
            </p>
          </div>
        </Form>
      ) : (
        <Form onSubmit={submitHandler} className={classes.authForm}>
          <div className={classes.welcome}>
            <h2 className={classes.title}>
              {isLogin ? "Hello, Again" : "Create Your Account"}
            </h2>
            <hr />
            <p className={classes.subtitle}>
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
                  name="name"
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
                name="email"
                ref={emailRef}
                required
                className={classes.inputFields}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
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
            <LoaderSmall text="Requesting..." />
          ) : (
            <Button type="submit" className={classes.submitBtn}>
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          )}

          {isLogin && (
            <div className="text-center mt-2">
              <p
                className={classes.switchText}
                style={{ cursor: "pointer" }}
                onClick={() => setIsForgotPassword(true)}
              >
                Forgot Password?
              </p>
            </div>
          )}

          <div className="text-center mt-5">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
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
      )}
    </Container>
  );
};

export default Auth;
