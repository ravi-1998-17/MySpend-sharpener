import React from "react";
import { Spinner } from "react-bootstrap";

export const LoaderSmall = ({ text = "Requesting..." }) => {
  return (
    <div className="text-center">
      <Spinner
        animation="border"
        size="sm"
        style={{ color: "var(--pink)" }}
      />{" "}
      <span style={{ color: "var(--pink)" }}>{text}</span>
    </div>
  );
};

export const PageLoader  = ({ text = "Loading..." }) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ flexDirection: "column" }}
    >
      <Spinner
        animation="border"
        size="md"
        style={{ color: "var(--pink)" }}
      />
      <span style={{ color: "var(--blue)", marginTop: "1rem"}}>{text}</span>
    </div>
  );
};
