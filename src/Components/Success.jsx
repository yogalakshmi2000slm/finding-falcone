import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router";

function SuccessPage() {
  const location = useLocation();
  const successMessage = location.state && location.state.successMessage;
  const navigate = useNavigate();

  const handleStartAgain = () => {
    navigate("/");
  };

  const successMessageStyle = {
    fontSize: "36px",
    textAlign: "center",
  };

  const buttonStyle = {
    fontSize: "24px",
    padding: "10px 20px",
    color: "white",
    background: "blue",
    cursor:"pointer",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      {successMessage && <p style={successMessageStyle}>{successMessage}</p>}
      <button onClick={handleStartAgain} style={buttonStyle}>
        Start Again
      </button>
    </div>
  );
}

export default SuccessPage;
