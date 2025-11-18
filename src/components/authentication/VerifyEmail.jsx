// components/authentication/VerifyEmail.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme); // optional if you track theme
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      if (!token) return;
      try {
        const res = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE`,
          { idToken: token }
        );
        const userData = res.data.users[0];
        setEmailVerified(!!userData.emailVerified);
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    };
    checkVerificationStatus();
  }, [token]);

  const handleVerifyEmail = async () => {
    if (!token) return;
    setLoading(true);
    setMessage("");
    try {
      await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE`,
        { requestType: "VERIFY_EMAIL", idToken: token }
      );
      setMessage("Verification email sent! Please check your inbox.");
    } catch (error) {
      console.error(error);
      if (error.response) {
        const errCode = error.response.data.error.message;
        if (errCode === "INVALID_ID_TOKEN") {
          setMessage("Invalid session. Please log in again.");
        } else if (errCode === "USER_NOT_FOUND") {
          setMessage("User not found. Please sign up again.");
        } else {
          setMessage("Something went wrong. Try again later.");
        }
      } else {
        setMessage("Network error. Please check your connection.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) return null;

  const btnStyle = {
    padding: "10px 20px",
    fontWeight: 600,
    borderRadius: "8px",
    border: "none",
    cursor: loading ? "not-allowed" : "pointer",
    backgroundColor: "var(--pink)",
    color: "var(--light)",
  };

  const alertStyle = {
    marginTop: "1rem",
    padding: "10px 15px",
    borderRadius: "8px",
    backgroundColor: theme === "dark" ? "var(--card-dark)" : "var(--grey)",
    color: theme === "dark" ? "var(--light)" : "var(--dark)",
  };

  return (
    <div style={{ textAlign: "center", marginTop: "1.5rem" }}>
      {!emailVerified ? (
        <>
          <button style={btnStyle} onClick={handleVerifyEmail} disabled={loading}>
            {loading ? "Sending..." : "Verify Email"}
          </button>
          {message && <div style={alertStyle}>{message}</div>}
        </>
      ) : (
        <div style={{ ...alertStyle, backgroundColor: "var(--green)" }}>
          Your email is already verified!
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
