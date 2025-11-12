import React from "react";
import ProfileBtn from "./ProfileBtn";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const ProfileAlert = () => {
  const navigate = useNavigate();

  const handleCheck = () => {
    navigate("/profile");
  };

  return (
    <div
      className="p-3"
      style={{
        background: "var(--green)",
        color: "var(--light)",
        width: "10%",
        height: "75px",
        borderRadius: "15px",
        position: "absolute",
        top: "2rem",
        right: "2rem",
        zIndex: "999"
      }}
    >
      <p>
        Your Profile is Incomplete. <br />{" "}
        <strong onClick={handleCheck} className="border-bottom" style={{cursor: "pointer"}}>
          Complete Now
        </strong>
      </p>
    </div>
  );
};

export default ProfileAlert;
