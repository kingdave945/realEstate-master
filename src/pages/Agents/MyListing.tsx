import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ListCard from "../../components/ListCard";
import SkeletonCard from "../../components/SkeletonCard";
import UploadedPropertyCard from "./UploadedProperties";
import axios from "axios";
import { getListing } from "../../Api";

import Modal from "react-modal";
import { toast } from "react-toastify";
import "./Listing.css";
import { getUserDetails } from "../../Api/saveDetails";
import './Mylisting.css'
import api from "../../Api/Interceptor"; 
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
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    state: "",
    price: 0,
    imageUrl: "",
    propertyType: "",
    propertyValue: "",
  });

 const [agentId, setAgentId] = useState<number | null>(null);

console.log("Agent ID:", agentId);
  const user = getUserDetails("agent") || getUserDetails("user") || getUserDetails("admin") || null;

  const [email, setEmail] = useState(user?.email || "");
useEffect(() => {
  const fetchAgentId = async () => {
    try {
      const token = localStorage.getItem("Adtoken");

      const res = await api.get("/api/Agent", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const agents = res.data.data;

      const match = agents.find(
        (agent: any) => agent.email.toLowerCase() === email.toLowerCase()
      );

      if (match) {
        setAgentId(match.id);
      } else {
        console.warn("Agent not found for this email.");
      }
    } catch (error) {
      console.error("Error fetching agent ID:", error);
    }
  };

  fetchAgentId();
}, [email]);

  // ✅ Use parsed token
  const token = getUserDetails("Agtoken");

  console.log("Token:", token);
  console.log("Loaded user from localStorage:", user);
  console.log("Agent ID:", agentId);


const fetchProperties = useCallback(
  async (reset = false) => {
    setLoading(true);
    try {
    
const res = await api.get("/api/Properties", {
  params: {
    pageNumber: page,
    pageSize: 10,
    agentId: agentId,   
  },
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

      const newProperties = res.data?.data || [];
      setProperties((prev) => (reset ? newProperties : [...prev, ...newProperties]));
      setHasMore(newProperties.length > 0 && page < res.data.totalPages);
    } catch (error) {
      if (reset) setProperties([]);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  },
  [page, token]
);

  useEffect(() => {
    setPage(1);
    setHasMore(true);
    if (agentId) fetchProperties(true);
  }, [search, agentId]);

  useEffect(() => {
    if (page > 1 && agentId) fetchProperties();
  }, [page]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage((prev) => prev + 1);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

const submitHandler = async () => {
  // ...validation...

  const payload = {
    id: 0,
    title: formData.title.trim(),
    description: formData.description.trim(),
    location: formData.location.trim(),
    state: formData.state.trim(),
    price: Number(formData.price),
    imageUrl: formData.imageUrl.trim(),
    propertyType: formData.propertyType.trim(),
    propertyValue: String(formData.propertyValue).trim(),
    agentId: Number(agentId),
    datePosted: new Date().toISOString(),
  };

  try {
    const response = await api.post("/api/Properties", payload, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    setShowModal(false);
    toast.success("Property uploaded successfully!");

    // ✅ Push the response from server to state
    setProperties((prev) => [response.data, ...prev]);

    // ✅ Optional: Refresh entire list later
    // setTimeout(() => fetchProperties(true), 2000);

    // Reset form
    setFormData({
      title: "",
      description: "",
      location: "",
      state: "",
      price: 0,
      imageUrl: "",
      propertyType: "",
      propertyValue: "",
    });

  } catch (err: any) {
    console.error("Error uploading property:", err.response?.data || err);
    alert(`Upload failed: ${err.response?.data?.message || "Check console for details."}`);
  }
};

const handlePropertyDelete = (id: number) => {
  setProperties((prev) => prev.filter((p) => p.id !== id));
};

  return (
    <div className="properties-wrapper">
      <h2 className="add-property-btn" onClick={() => setShowModal(true)}>
        <i className="bi bi-plus"></i> Click here to Add a New Property
      </h2>

      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="custom-modal"
        overlayClassName="custom-overlay"
      >
        <div className="upload-property-form">
          <div className="input-fields-btns">
            <div>
              <input name="title" placeholder="Title" onChange={handleInputChange} value={formData.title} />
              <input name="location" placeholder="Location" onChange={handleInputChange} value={formData.location} />
              <input name="state" placeholder="State" onChange={handleInputChange} value={formData.state} />
              <input name="price" type="number" placeholder="Price" onChange={handleInputChange} value={formData.price} />
              <input name="imageUrl" placeholder="Image URL" onChange={handleInputChange} value={formData.imageUrl} />
              {/* {formData.imageUrl && (
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  style={{ width: "100%", maxHeight: 200, objectFit: "cover", marginTop: 10 }}
                />
              )} */}
              <input name="propertyType" placeholder="Property Type" onChange={handleInputChange} value={formData.propertyType} />
              <input name="propertyValue" type="number" placeholder="Property Value" onChange={handleInputChange} value={formData.propertyValue} />
            </div>

            <div>
              <button onClick={submitHandler}>Submit</button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">Cancel</button>
            </div>
          </div>
          <div>
            <textarea
              name="description"
              placeholder="Description"
              onChange={handleInputChange}
              value={formData.description}
            />
          </div>
        </div>
      </Modal>
<div className="property-upload-list">
  {properties.map((prop, idx) => (
    <UploadedPropertyCard
      key={prop.id}
      property={prop}
      onDelete={handlePropertyDelete} 
    />
  ))}
  {loading && <SkeletonCard />}
</div>



    </div>
  );
}
