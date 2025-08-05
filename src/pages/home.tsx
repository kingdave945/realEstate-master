import React, { useState, useEffect } from "react";
import ListCard from "../components/ListCard";
import "./home.css";
import image from "../assets/m.jpeg";
import Landing from "./landing";
import { getProperties } from "../Api";

export default function Home() {
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeatured = async () => {
      setLoading(true);
      try {
        // Fetch first page, 4 items, empty search
        const data = await getProperties("", 1, 10);
        console.log("✅API response from getProperties:", data);

        if (!data) {
          console.warn("⚠️ No response received from API.");
        } else if (!data.data) {
          console.warn("⚠️ API response does not contain 'data' field:", data);
        } else if (data.data.length === 0) {
          console.warn("⚠️ API returned empty data array.");
        } else {
          console.log("✅ Properties received:", data.data);
        }

        setProperties(data?.data || []);
      } catch (error) {
        console.error("❌ Error fetching properties:", error);
        setProperties([]);
      }
      setLoading(false);
    };

    fetchFeatured();
  }, []);

  return (
    <div>
      <div>
        <Landing />
      </div>
      <div className="hero">
        <h1 className="section-title">Featured Properties</h1>
    <div className="properties">
  {loading ? (
    Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className="skeleton-card" />
    ))
  ) : properties.length > 0 ? (
    properties.map((property: any) => (
      <ListCard
        key={property.id}
        id={property.id}
        imageUrl={
          property.imageUrl?.startsWith("http")
            ? property.imageUrl
            : `http://kendis-001-site1.ntempurl.com/${property.imageUrl}`
        }
        title={property.title}
        price={"₦ " + Number(property.price).toLocaleString("en-NG")}
        location={
          property.location +
          (property.state ? ", " + property.state : "")
        }
      />
    ))
  ) : (
    <p style={{ fontSize: "1.2rem", color: "#888" }}>
      No featured properties found.
    </p>
  )}
</div>

        <div className="why-choose">
          <h2>Why Choose Us</h2>
          <p>
            We provide the best service offering to match you with the perfect
            property to help you find your dream home. We provide the best
            service offering to match you with the perfect property to help you
            find your dream home. We provide the best service offering to match
            you with the perfect property to help you find your dream home. We
            provide the best service offering to match you with the perfect
            property to help you find your dream home.
          </p>
        </div>
      </div>
             <div style={{ padding: "50px" }}>
          <h1
            style={{
              fontSize: "2rem",
              color: "#1d3557",
              marginBottom: "1rem",
            }}
          >
            About Us
          </h1>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#333",
              marginBottom: "1.5rem",
            }}
          >
            Welcome to <strong>Find Your Dream Home</strong>, your trusted
            partner in finding the perfect property. Our mission is to connect
            buyers, renters, and agents with the best real estate opportunities.
          </p>
          <p
            style={{
              fontSize: "1.1rem",
              color: "#333",
              marginBottom: "1.5rem",
            }}
          >
            We offer a wide range of listings, from cozy apartments to luxurious
            homes, and provide tools to make your search easy and enjoyable. Our
            dedicated team is passionate about helping you make informed
            decisions and achieve your real estate goals.
          </p>
          <p style={{ fontSize: "1.1rem", color: "#333" }}>
            Thank you for choosing <strong>Find Your Dream Home</strong>. If you
            have any questions or need assistance, feel free to contact our
            support team.
          </p>
        </div>
      <footer style={{ backgroundColor: "#1e1e46", color: "#fff", padding: "50px", }}>
<div>
  <h3>Find Your Dream Home, one-stop solution for real estate</h3>

Discover the most rapidly expanding real estate platform in Nigeria. When you choose us, you'll experience a seamless journey while searching for homes, short-term rentals, apartments, and available land for both sale and rent, making you feel right at home.
</div>
<div>
  <h3>Contact Us</h3>
  <ul>
    <li>Email: <a className="email-link-contact-us" href="mailto:mayorkundavid@gmail.com">
   mayorkundavid@gmail.com
  </a>
  </li>
  <li>
    Phone: <a className="email-link-contact-us" href="tel:+2349030000000">
    +2349030000000
  </a></li>
  </ul>
{/* <p>
  Email: <a className="email-link-contact-us" href="mailto:mayorkundavid@gmail.com">
   mayorkundavid@gmail.com
  </a>
  <br />
 
</p> */}

</div>
        <p>&copy;Find Your Dream Home - {new Date().getFullYear()} </p>
      </footer>
    </div>
  );
}
