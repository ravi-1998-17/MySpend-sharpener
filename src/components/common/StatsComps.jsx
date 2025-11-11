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
      <span style={{color: "var(--pink)"}}>{text}</span>
    </div>
  );
};
