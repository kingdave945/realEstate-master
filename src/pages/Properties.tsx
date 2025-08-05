import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ListCard from "../components/ListCard";
import SkeletonCard from "../components/SkeletonCard";
import image from "../assets/licensed-image.jpg";
import { getProperties } from "../Api";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Properties() {
  const query = useQuery();
  const initialSearch = query.get("search") || "";
  const [search, setSearch] = useState(initialSearch);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch properties from API
  const fetchProperties = useCallback(
    async (reset = false) => {
      setLoading(true);
      try {
        const data = await getProperties(search, page, 4);
        const newProperties = data?.data || [];
        setProperties((prev) =>
          reset ? newProperties : [...prev, ...newProperties]
        );
        setHasMore(newProperties.length > 0 && page < data.totalPages);
      } catch (error) {
        if (reset) setProperties([]);
        setHasMore(false);
      }
      setLoading(false);
    },
    [search, page]
  );

  // Reset when search changes
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    fetchProperties(true);
    // eslint-disable-next-line
  }, [search]);

  // Fetch more when page changes (but not on first render)
  useEffect(() => {
    if (page === 1) return;
    fetchProperties();
    // eslint-disable-next-line
  }, [page]);

  // Infinite scroll handler
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div style={{ padding: "0 20px", marginBottom: "30px" }}>
      <h1 style={{ color: "#1d3557", marginBottom: "1.5rem" }}>Properties</h1>
      <input
        type="text"
        placeholder="Search by title or location"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "0.7rem 1rem",
          borderRadius: "6px",
          border: "1px solid #bcd0e5",
          marginBottom: "2rem",
          width: "100%",
          maxWidth: "320px",
          fontSize: "1rem",
        }}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "2rem",
        }}
      >
        {loading && properties.length === 0
          ? Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)
          : properties.length > 0
          ? (
              <>
                {properties.map((property: any) => (
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
                ))}
                {/* Skeletons for infinite scroll loading */}
                {loading &&
                  Array.from({ length: 2 }).map((_, i) => (
                    <SkeletonCard key={`pagination-skeleton-${i}`} />
                  ))}
              </>
            )
          : (
            <p style={{ fontSize: "1.2rem", color: "#888" }}>
              No properties found in "{search}"
            </p>
          )}
      </div>
      {/* Remove the old bottom skeletons here */}
      {!hasMore && properties.length > 0 && (
        <p style={{ textAlign: "center", color: "#888" }}>No more properties.</p>
      )}
    </div>
  );
}