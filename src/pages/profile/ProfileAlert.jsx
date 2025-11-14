import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert, Button, CloseButton } from "react-bootstrap";

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
        color: "var(--light)",
        position: "fixed",
        bottom: "1rem",
        right: "1.75rem",
        border: "none",
        borderRadius: "10px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
        padding: "1rem 1.5rem",
        fontSize: "0.90rem",
        zIndex: 1050,
      }}
      className="d-flex justify-content-between align-items-center gap-3"
    >
      <div>
        <p style={{ marginBottom: "0.25rem" }}>Your Profile is Incomplete.</p>
        <strong
          onClick={handleCheck}
          style={{
            color: "var(--light)",
            fontWeight: 600,
            textTransform: "uppercase",
            textDecoration: "underline",
            cursor: "pointer"
          }}
        >
          Complete Now
        </strong>
      </div>
      {/* <CloseButton
        variant="white"
        style={{
          opacity: 1,
        }}
        onClick={() => setShow(false)}
      /> */}
    </Alert>
  );
};

export default ProfileAlert;
