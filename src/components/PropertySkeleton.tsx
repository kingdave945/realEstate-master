import React from "react";

export default function PropertySkeleton() {
  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <div
        style={{
          width: "100%",
          height: 350,
          background: "#e0e0e0",
          borderRadius: "10px",
          marginBottom: "2rem",
          animation: "pulse 1.5s infinite",
        }}
      />
      <div style={{ height: 32, width: "60%", background: "#e0e0e0", borderRadius: 6, marginBottom: 16, animation: "pulse 1.5s infinite" }} />
      <div style={{ height: 24, width: "40%", background: "#e0e0e0", borderRadius: 6, marginBottom: 16, animation: "pulse 1.5s infinite" }} />
      <div style={{ height: 20, width: "80%", background: "#e0e0e0", borderRadius: 6, marginBottom: 32, animation: "pulse 1.5s infinite" }} />
      <div style={{ height: 48, width: "30%", background: "#e0e0e0", borderRadius: 6, marginBottom: 32, animation: "pulse 1.5s infinite" }} />
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