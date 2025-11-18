import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import { useSelector } from "react-redux";

const VerifyEmail = () => {
  const { token, isLoggedIn } = useSelector((state) => state.auth);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  // Check verification status
  useEffect(() => {
    const checkVerificationStatus = async () => {
      if (!token) return;
      try {
        const res = await axios.post(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE`,
          { idToken: token }
        );
        const userData = res.data.users[0];
        setEmailVerified(userData.emailVerified);
        console.log("Email Verified:", userData.emailVerified);
      } catch (error) {
        console.error("Error checking verification status:", error);
      }
    };
    checkVerificationStatus();
  }, [token]);

  // Send verification mail
  const handleVerifyEmail = async () => {
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBfGfNN_C1BgPf5HAFIPLRsrFXTpkYZccE`,
        {
          requestType: "VERIFY_EMAIL",
          idToken: token,
        }
      );
      setMessage("Verification email sent! Please check your inbox.");
      console.log("Email verification sent:", res.data);
    } catch (error) {
      console.error(error);
      if (error.response) {
        const errCode = error.response.data.error.message;
        if (errCode === "INVALID_ID_TOKEN") {
          setMessage("Invalid or expired login session. Please log in again.");
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

  // Show only if logged in and not verified
  if (!isLoggedIn) return null;

  return (
    <div className="text-center mt-4">
      {!emailVerified ? (
        <>
          <Button variant="info" onClick={handleVerifyEmail} disabled={loading}>
            {loading ? "Sending..." : "Verify Email"}
          </Button>
          {message && (
            <Alert className="mt-3" variant="light">
              {message}
            </Alert>
          )}
        </>
      ) : (
        <Alert variant="success" className="mt-3">
          Your email is already verified!
        </Alert>
      )}
    </div>
  );
};

export default VerifyEmail;
