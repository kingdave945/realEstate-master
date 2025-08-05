export default function About() {
  return (
    <div className="about" style={{
      maxWidth: "700px",
      margin: "3rem auto",
      padding: "2rem",
      background: "rgba(255,255,255,0.95)",
      borderRadius: "12px",
      boxShadow: "0 4px 24px rgba(0,0,0,0.07)"
    }}>
      <h1 style={{ fontSize: "2rem", color: "#1d3557", marginBottom: "1rem" }}>About Us</h1>
      <p style={{ fontSize: "1.1rem", color: "#333", marginBottom: "1.5rem" }}>
        Welcome to <strong>Home Find</strong> , your trusted partner in finding the perfect property. 
        Our mission is to connect buyers, renters, and agents with the best real estate opportunities.
      </p>
      <p style={{ fontSize: "1.1rem", color: "#333", marginBottom: "1.5rem" }}>
        We offer a wide range of listings, from cozy apartments to luxurious homes, and provide tools to make your search easy and enjoyable.
        Our dedicated team is passionate about helping you make informed decisions and achieve your real estate goals.
      </p>
      <p style={{ fontSize: "1.1rem", color: "#333" }}>
        Thank you for choosing <strong>Home Find</strong>. If you have any questions or need assistance, feel free to contact our support team.
      </p>
    </div>
  );
}