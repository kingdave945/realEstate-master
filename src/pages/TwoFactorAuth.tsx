import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TwoFAVerification } from "../Api/index";
import "./TwoFactrAuth.css"; // Assuming you have a CSS file for styles
export default function TwoFactorAuth() {
  const navigate = useNavigate();
  const email = sessionStorage.getItem("email") || "";

  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError("");
    try {
      await TwoFAVerification({ email, code });
      setStatus("idle");
      const role = sessionStorage.getItem("role");

      switch (role) {
        case "agent":
          navigate("/agent");
          break;
        case "user":
          navigate("/");
          break;
        case "admin":
          navigate("/admin");
          break;
        default:
          break;
      }
    } catch (err: any) {
      setStatus("error");
      setError(
        err?.response?.data?.message ||
          "Invalid code or something went wrong. Please try again."
      );
    }
  };

  return (
    <div  className="two-factor-auth-container">
    <div
   
      style={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f9f9f9",
        opacity: 0.9,
        borderRadius: 12,
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        margin: "40px auto",
        maxWidth: 400,
   zIndex: 1,
        padding: 32,
      }}
    >
      <h2 style={{ marginBottom: 24 }}>Two-Factor Authentication</h2>
      <form onSubmit={handleSubmit} style={{ width: "100%" }}>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 8 }}>2FA Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
            style={{
              width: "95%",
              outline:"none",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
              fontSize: 16,
              letterSpacing: 4,
            }}
            maxLength={6}
            inputMode="numeric"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            background: "#007bff",
            color: "#fff",
            fontWeight: 600,
            fontSize: 16,
            border: "none",
            cursor: status === "loading" ? "not-allowed" : "pointer",
          }}
        >
          {status === "loading" ? "Verifying..." : "Verify"}
        </button>
        {status === "error" && (
          <div
            style={{
              color: "#D8000C",
              marginTop: 16,
              textAlign: "center",
            }}
          >
            {error}
          </div>
        )}
      </form>
    </div>
    </div>
  );
}
