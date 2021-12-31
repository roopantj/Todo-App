import React from "react";
import { Button } from "reactstrap";
import { useNavigate } from "react-router-dom";
const NoPage = () => {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" }}>
      <h1>No Page found</h1>
      <Button onClick={() => navigate("/")}>Go Home</Button>
    </div>
  );
};

export default NoPage;
