import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getProperty, sendMessage } from "../Api";
import PropertySkeleton from "../components/PropertySkeleton";
import { getUserDetails } from "../Api/saveDetails";
import { useNavigate } from "react-router-dom";

export default function Property() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true); 
  
  const user =
  getUserDetails("user") ||
  getUserDetails("agent") ||
    getUserDetails("admin") ||
    null;
  // Contact form state
  const [email, setEmail] = useState(user?.email || "");
  const [content, setContent] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // React.useEffect(() => {
  //   const fetchProperty = async () => {
  //     setLoading(true);
  //     try {
  //       if (id) {
  //         const data = await getProperty(id);
  //         setProperty(data);
  //       } else {
  //         setProperty(null);
  //       }
  //     } catch (error) {
  //       setProperty(null);
  //     }
  //     setLoading(false);
  //   };
  //   fetchProperty();
  // }, [id]);
React.useEffect(() => {
  let isMounted = true; 
  setLoading(true);

  const fetchProperty = async () => {
    try {
      if (!id) {
        setProperty(null);
        setLoading(false);
        return;
      }

      
      await new Promise((res) => setTimeout(res, 1000)); 

      const data = await getProperty(id);
      if (isMounted) {
        setProperty(data);
      }
    } catch (error) {
      if (isMounted) {
        setProperty(null);
      }
    } finally {
      if (isMounted) {
        setLoading(false);
      }
    }
  };

  fetchProperty();

  return () => {
    isMounted = false;
  };
}, [id]);

  if (loading) {
    return <PropertySkeleton />;
  }

  if (!property) {
    return <Navigate to="/404" replace />;
  }


const imageUrl = property.imageUrl
  ? property.imageUrl.startsWith("http")
    ? property.imageUrl
    : `http://kendis-001-site1.ntempurl.com/${property.imageUrl}`
  : "https://via.placeholder.com/800x350?text=No+Image";

  
// const handleContactSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   if (!user || !email) {
//     navigate("/login");
//     return;
//   }

//   const messageData = {
//     propertyId: property.id,
//     content: content
//   };

//   try {
//     console.log("Sending message from:", email);
//     await sendMessage(email, messageData);
//     setSubmitted(true);
//     setContent("");
//   } catch (error) {
//     console.error("Error sending message:", error);
//     alert("Failed to send message.");
//   }
// };
const handleContactSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!user || !email) {
    navigate("/login");
    return;
  }

  const messageData = {
    propertyId: property.id,
    content: content
  };

  try {
    await sendMessage(email, messageData);
    setSubmitted(true);
    setContent("");
  } catch (error: any) {
    // Show backend error if agent is missing
    console.error("Error sending message:", error);
    alert(error.response?.data || "Failed to send message.");
  }
};

  return (
    <div style={{ padding: "2rem", maxWidth: 800, margin: "0 auto" }}>
      <div style={{ position: "relative", width: "100%", maxHeight: 350 }}>
        {imageLoading && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: 350,
              background: "#e0e0e0",
              borderRadius: "10px",
              zIndex: 1,
              animation: "pulse 1.5s infinite",
            }}
          />
        )}
        <img
          src={imageUrl}
          alt={property.title}
          style={{
            width: "100%",
            maxHeight: 350,
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "2rem",
            display: imageLoading ? "none" : "block",
          }}
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
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
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        {property.title}
      </h1>
      <p style={{ fontSize: "1.25rem", marginBottom: "1rem" }}>
        <strong>₦</strong>
        {Number(property.price).toLocaleString("en-NG")}
      </p>
      <p style={{ fontSize: "1rem", marginBottom: "1rem", color: "#555" }}>
        {property.location + (property.state ? ", " + property.state : "")}
      </p>
      <p style={{ fontSize: "1rem", marginBottom: "2rem", color: "#777" }}>
        {property.description}
      </p>
      <button
        onClick={() => window.history.back()}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          color: "#fff",
          backgroundColor: "#007bff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "2rem",
        }}
      >
        Back to Properties
      </button>

      <div
        style={{
          marginTop: "2rem",
          background: "#f9f9f9",
          borderRadius: "8px",
        }}
      >
        <h2>Get in Contact</h2>
        {submitted ? (
          <p style={{ color: "green" }}>
            Thank you for your message! We will get back to you soon.
          </p>
        ) : (
          <form onSubmit={handleContactSubmit}>
            <div style={{ marginBottom: "1rem" }}>
              <label>
                Email:
                <input
                  type="email"
                  value={email}
                  disabled={user ? true : false}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginTop: "0.5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </label>
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <label>
                Message:
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                  rows={4}
                  style={{
                    resize: "none",
                    width: "100%",
                    padding: "0.5rem",
                    marginTop: "0.5rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                  }}
                />
              </label>
            </div>
            <button
              type="submit"
              style={{
                padding: "0.5rem 1.5rem",
                fontSize: "1rem",
                color: "#fff",
                backgroundColor: "#457b9d",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
