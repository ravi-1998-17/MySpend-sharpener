// components/auth/Auth.jsx
import React, { useState, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { LoaderSmall } from "../common/StatsComps";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, setError } from "@/store/slices/authSlice";
import classes from "@/components/authentication/Auth.module.css";

const Auth = () => {
  const dispatch = useDispatch();

  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const [loadingLocal, setLoadingLocal] = useState(false);
  const [errorLocal, setErrorLocal] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const nameRef = useRef();

  const switchModeHandler = () => {
    setIsLogin((prev) => {
      if (prev === true) {
        return false;
      } else {
        return true;
      }
    });
    setErrorLocal("");
    setIsForgotPassword(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoadingLocal(true);
    setErrorLocal("");

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      let url = isLogin
        ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE"
        : "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE";

      const { data } = await axios.post(url, {
        email,
        password,
        returnSecureToken: true,
      });

      dispatch(
        login({
          token: data.idToken,
          email: data.email,
          uid: data.localId,
        })
      );
    } catch (err) {
      const message =
        err.response?.data?.error?.message || "Authentication failed";
      setErrorLocal(message);
      dispatch(setError(message));
    }
    setLoadingLocal(false);
  };

  const forgotPasswordHandler = async (e) => {
    e.preventDefault();
    setLoadingLocal(true);
    setErrorLocal("");

    const email = emailRef.current.value;

    try {
      const url = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE`;

      await axios.post(url, { requestType: "PASSWORD_RESET", email });

      alert(
        "Password reset link has been sent to your email. Please check your inbox."
      );
      setIsForgotPassword(false);
    } catch (err) {
      const message =
        err.response?.data?.error?.message || "Failed to send reset email";
      setErrorLocal(message);
      dispatch(setError(message));
    }
    setLoadingLocal(false);
  };

  return (
    <Container fluid className={classes.container}>
      {isForgotPassword ? (
        <Form onSubmit={forgotPasswordHandler} className={classes.form}>
          <h2 className={classes.title}>Forgot Password</h2>
          <hr className={classes.hr} />
          <p className={classes.subtitle}>
            Enter your email and we will send you a reset link.
          </p>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
              className={classes.input}
            />
          </Form.Group>

          {errorLocal && <p className={classes.error}>{errorLocal}</p>}

          {loadingLocal ? (
            <LoaderSmall text="Sending..." />
          ) : (
            <Button type="submit" className={classes.submitBtn}>
              Send Reset Link
            </Button>
          )}

          <p
            className={classes.switchText}
            style={{ marginTop: "1rem" }}
            onClick={() => setIsForgotPassword(false)}
          >
            Back to Login
          </p>
        </Form>
      ) : (
        <Form onSubmit={submitHandler} className={classes.form}>
          <h2 className={classes.title}>
            {isLogin ? "Hello, Again" : "Create Your Account"}
          </h2>
          <hr className={classes.hr} />
          <p className={classes.subtitle}>
            {isLogin
              ? "We are happy to have you back."
              : "Join us and get started in seconds!"}
          </p>

          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                ref={nameRef}
                required
                className={classes.input}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
              className={classes.input}
              name="email"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
              className={classes.input}
              name="password"
            />
          </Form.Group>

          {errorLocal && <p className={classes.error}>{errorLocal}</p>}

          {loadingLocal ? (
            <LoaderSmall text="Requesting..." />
          ) : (
            <Button type="submit" className={classes.submitBtn}>
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          )}

          {isLogin && (
            <p
              className={classes.switchText}
              style={{ marginTop: "1rem" }}
              onClick={() => setIsForgotPassword(true)}
            >
              Forgot Password?
            </p>
          )}

          <p style={{ marginTop: "3rem" }}>
            {isLogin ? "Don't have an account? " : "Have an account? "}
            <span className={classes.switchText} onClick={switchModeHandler}>
              {isLogin ? "Create Account" : "Login"}
            </span>
          </p>
        </Form>
      )}
    </Container>
  );
};

export default Auth;
