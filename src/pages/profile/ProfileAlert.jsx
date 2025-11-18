import React from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "react-bootstrap";

const ProfileAlert = () => {
  const navigate = useNavigate();

  const handleCheck = () => {
    navigate("/profile");
  };

  return (
    <Alert
      variant=""
      style={{
        background: "var(--green)",
        color: "white",
        position: "fixed",
        bottom: "1rem",
        right: "1.75rem",
        border: "none",
        borderRadius: "12px",
        padding: "1rem 1.5rem",
        fontSize: "0.90rem",
        zIndex: 1050,
        boxShadow: "0px 4px 10px rgba(0,0,0,0.25)",
      }}
      className="d-flex justify-content-between align-items-center gap-3"
    >
      <div>
        <p style={{ marginBottom: "0.25rem" }}>Your Profile is Incomplete.</p>

        <strong
          onClick={handleCheck}
          style={{
            color: "white",
            fontWeight: 600,
            cursor: "pointer",
            textDecoration: "underline",
            letterSpacing: "0.5px",
          }}
        >
          Complete Now
        </strong>
      </div>
    </Alert>
  );
};

export default ProfileAlert;
