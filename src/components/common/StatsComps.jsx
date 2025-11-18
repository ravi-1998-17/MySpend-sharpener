// components/common/StatsComps.jsx
import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";

export const LoaderSmall = ({ text = "Requesting..." }) => {
  const { theme } = useSelector((state) => state.theme);

  return (
    <div className="text-center">
      <Spinner
        animation="border"
        size="sm"
        style={{ color: "var(--pink)" }}
      />
      <span
        style={{
          color: "var(--pink)",
          marginLeft: "6px",
          fontWeight: 500,
        }}
      >
        {text}
      </span>
    </div>
  );
};

export const PageLoader = ({ text = "Loading..." }) => {
  const { theme } = useSelector((state) => state.theme);

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
      <span
        style={{
          color: theme === "dark" ? "var(--light)" : "var(--blue)",
          marginTop: "1rem",
          fontSize: "1.1rem",
          fontWeight: 500,
        }}
      >
        {text}
      </span>
    </div>
  );
};
