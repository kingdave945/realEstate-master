import React from "react";

export default function SkeletonCard() {
  return (
    <div
      style={{
        background: "#f0f0f0",
        borderRadius: "10px",
        padding: "1rem",
        minHeight: 320,
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        boxShadow: "0 2px 8px #0001",
        animation: "pulse 1.5s infinite",
      }}
    >
      <div style={{ background: "#e0e0e0", height: 180, borderRadius: "8px" }} />
      <div style={{ background: "#e0e0e0", height: 24, width: "60%", borderRadius: "4px" }} />
      <div style={{ background: "#e0e0e0", height: 18, width: "40%", borderRadius: "4px" }} />
      <div style={{ background: "#e0e0e0", height: 16, width: "80%", borderRadius: "4px" }} />
      <style>
        {`
          @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
          }
        `}
      </style>
    </div>
  );
}