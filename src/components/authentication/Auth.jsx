// components/auth/Auth.jsx
import React, { useState, useRef } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { LoaderSmall } from "../common/StatsComps";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login, setError } from "@/store/slices/authSlice";

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
    setIsLogin((prev) => !prev);
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

      const { data } = await axios.post(url, { email, password, returnSecureToken: true });

      dispatch(
        login({
          token: data.idToken,
          email: data.email,
          uid: data.localId,
          photo: data.photoUrl || null,
        })
      );
    } catch (err) {
      const message = err.response?.data?.error?.message || "Authentication failed";
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

      alert("Password reset link has been sent to your email. Please check your inbox.");
      setIsForgotPassword(false);
    } catch (err) {
      const message = err.response?.data?.error?.message || "Failed to send reset email";
      setErrorLocal(message);
      dispatch(setError(message));
    }

    setLoadingLocal(false);
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "var(--light)",
    color: "var(--dark)",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    maxWidth: "600px",
    width: "100%",
    padding: "1rem",
  };

  const titleStyle = {
    fontSize: "2.5rem",
    fontWeight: 500,
    marginBottom: "10px",
    textAlign: "start",
  };

  const hrStyle = {
    width: "10%",
    border: "2px solid var(--blue)",
    marginBottom: "10px",
  };

  const subtitleStyle = {
    color: "#666",
    marginBottom: "30px",
    textAlign: "start",
  };

  const inputStyle = {
    width: "100%",
    padding: "1rem .75rem",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "15px",
  };

  const inputFocusStyle = {
    borderColor: "var(--blue)",
    outline: "none",
  };

  const submitBtnStyle = {
    backgroundColor: "var(--blue)",
    color: "var(--light)",
    border: "none",
    width: "100%",
    padding: ".75rem",
    borderRadius: "8px",
    fontSize: "1rem",
    textTransform: "uppercase",
    cursor: "pointer",
  };

  const switchTextStyle = {
    color: "var(--blue)",
    fontWeight: 600,
    cursor: "pointer",
  };

  const errorStyle = {
    color: "var(--pink)",
    fontSize: "14px",
    marginBottom: "15px",
  };

  return (
    <Container fluid style={containerStyle}>
      {isForgotPassword ? (
        <Form onSubmit={forgotPasswordHandler} style={formStyle}>
          <h2 style={titleStyle}>Forgot Password</h2>
          <hr style={hrStyle} />
          <p style={subtitleStyle}>Enter your email and we will send you a reset link.</p>

          <Form.Group className="mb-3">
            <Form.Control
              type="email"
              placeholder="Email"
              ref={emailRef}
              required
              style={inputStyle}
            />
          </Form.Group>

          {errorLocal && <p style={errorStyle}>{errorLocal}</p>}

          {loadingLocal ? (
            <LoaderSmall text="Sending..." />
          ) : (
            <Button type="submit" style={submitBtnStyle}>
              Send Reset Link
            </Button>
          )}

          <p
            style={{ ...switchTextStyle, marginTop: "1rem" }}
            onClick={() => setIsForgotPassword(false)}
          >
            Back to Login
          </p>
        </Form>
      ) : (
        <Form onSubmit={submitHandler} style={formStyle}>
          <h2 style={titleStyle}>{isLogin ? "Hello, Again" : "Create Your Account"}</h2>
          <hr style={hrStyle} />
          <p style={subtitleStyle}>
            {isLogin ? "We are happy to have you back." : "Join us and get started in seconds!"}
          </p>

          {!isLogin && (
            <Form.Group className="mb-3">
              <Form.Control
                type="text"
                placeholder="Name"
                ref={nameRef}
                required
                style={inputStyle}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Control type="email" placeholder="Email" ref={emailRef} required style={inputStyle} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="password"
              placeholder="Password"
              ref={passwordRef}
              required
              style={inputStyle}
            />
          </Form.Group>

          {errorLocal && <p style={errorStyle}>{errorLocal}</p>}

          {loadingLocal ? (
            <LoaderSmall text="Requesting..." />
          ) : (
            <Button type="submit" style={submitBtnStyle}>
              {isLogin ? "Login" : "Sign Up"}
            </Button>
          )}

          {isLogin && (
            <p style={{ ...switchTextStyle, marginTop: "1rem" }} onClick={() => setIsForgotPassword(true)}>
              Forgot Password?
            </p>
          )}

          <p style={{ marginTop: "3rem" }}>
            {isLogin ? "Don't have an account? " : "Have an account? "}
            <span style={switchTextStyle} onClick={switchModeHandler}>
              {isLogin ? "Create Account" : "Login"}
            </span>
          </p>
        </Form>
      )}
    </Container>
  );
};

export default Auth;
