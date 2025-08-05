import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(120deg, #e0eafc 0%, #cfdef3 100%)",
        textAlign: "center",
        padding: "2rem"
      }}
    >
      <h1 style={{ fontSize: "5rem", color: "#457b9d", marginBottom: "1rem" }}>404</h1>
      <h2 style={{ fontSize: "2rem", color: "#1d3557", marginBottom: "1rem" }}>Page Not Found</h2>
      <p style={{ color: "#333", marginBottom: "2rem" }}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link to="/" style={{ textDecoration: "none" }}>
        <button
          style={{
            background: "#457b9d",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            padding: "0.75rem 1.5rem",
            fontSize: "1rem",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          Go Home
        </button>
      </Link>
    </div>
  );
}