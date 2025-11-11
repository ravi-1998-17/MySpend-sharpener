import React from "react";
import { Spinner } from "react-bootstrap";

const StatsComps = () => {
  return (
    <>
      <div style={{ textAlign: "center", padding: "20px" }}>
        <Spinner animation="border" role="status" />
        <p>Loading...</p>
      </div>
    </>
  );
};

export default StatsComps;
