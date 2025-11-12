import React, { useState } from "react";
import { Button, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const GoogleBtn = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/profile");
  };

  return (
    <div className="d-flex justify-content-between align-items-center gap-2">
      <Button
        onClick={handleClick}
        style={{
          background: "var(--pink)",
          borderColor: "var(--pink)",
          position: "relative",
        }}
        className="d-flex justify-content-between align-items-center gap-2 px-3"
      >
        <i className="bi bi-person"></i>
        <span>Profile</span>
      </Button>
    </div>
  );
};

export default GoogleBtn;
