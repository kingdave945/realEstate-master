import React, { useEffect, useState } from "react";
import { getUserDetails } from "../../Api/saveDetails";
import {toast} from 'react-toastify'
import '../User/usermain.css';
import { uploadProfilePicture } from "../../Api";
import { useNavigate } from "react-router-dom";
import { disableAccount } from "../../Api";
import NavBar from "../navbar";

import api from "../../Api/Interceptor";
export default function AgentProfile() {
  const navigate = useNavigate()
  const user = getUserDetails("user") || getUserDetails("agent") || getUserDetails("admin") || null;
  const name = user?.fullName || "User";
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showFields, setShowFields] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phoneNumber || "");
  const [username, setUserName] = useState(user?.userName || "");
  const [fullname, setFullName] = useState(user?.fullName || "");

  useEffect(() => {
    const timer = setTimeout(() => setShowFields(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 24) return "Good evening";
    return "Hello";
  };

  

  const handleSave = () => {

    console.log("Saved data:", {
      email,
      phone,
      username,
      fullname,
    });
    setIsEditing(false);
  };


const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (!file) return;

  try {
    const data = await uploadProfilePicture(file);
    toast.success("Profile picture uploaded!");


    if (data.filePath) {
      setProfileImage(`http://kendis-001-site1.ntempurl.com/${data.filePath}`);
    } else {
      setProfileImage(URL.createObjectURL(file)); // fallback preview
    }
  } catch (err: any) {
    toast.error("Upload failed");
    console.error(err);
  }
};


const handleDisableAccount = async () => {
  const confirmDelete = window.confirm("You are about to disbale your account permanently. Do you wish to continue?");
  if (!confirmDelete) return;

  const password = prompt("Enter your password to confirm action:") ?? "";
  if (!password) {
    toast.error("Password is required.");
    return;
  }

  try {
    await disableAccount(password);
    toast.success("Account disabled successfully.");
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = "/login";
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to delete account.");
    console.error("Delete error:", error);
  }
};
const [agentId, setAgentId] = useState<number | null>(null);
useEffect(() => {
  const fetchAgentId = async () => {
    if (!email) {
      console.warn("Email not ready yet");
      return;
    }

    try {
      // Directly call the endpoint without Authorization
      const res = await api.get("/api/Agent");

      console.log("API response:", res.data);

      const agents = res.data.data ?? res.data;

      const match = agents.find(
        (agent: any) =>
          agent.email.trim().toLowerCase() === email.trim().toLowerCase()
      );

      if (match) {
        setAgentId(match.id);
        console.log("Found agent ID:", match.id);
      } else {
        console.warn("Agent not found for this email.");
      }
    } catch (error) {
      console.error("Error fetching agent ID:", error);
    }
  };

  fetchAgentId();
}, [email]);

console.log("Agent ID:", agentId);
  return (
    <>
    <NavBar />
    <div style={{ height: "100vh", width: "100%", display: "flex", justifyContent: "center", backgroundColor: "#f9f9f9" }}>
      <div style={{ maxWidth: "400px", padding: "20px", display: "flex", flexDirection: "column" }}>
        <h1 className={`fade-in ${showFields ? "show delay-1" : ""}`} style={{ color: "rgb(30, 30, 70)" }}>
          {getGreeting()}, {name}
        </h1>

        <div style={{ display: "flex", justifyContent: "center" }}>
       <label
  htmlFor="profilePicInput"
  className={`fade-in ${showFields ? "show delay-2" : ""}`}
  style={{
    marginTop: "2px",
    width: "140px",
    height: "140px",
    borderRadius: "50%",
    border: "4px solid #1e1e46",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#eee",
  }}
>
  {profileImage ? (
    <img
      src={profileImage}
      alt="Profile"
      style={{ width: "100%", height: "100%", objectFit: "cover" }}
    />
  ) : (
    <span style={{ color: "#888" }}>Upload</span>
  )}
<input
  id="profilePicInput"
  type="file"
  accept="image/*"
  style={{ display: "none" }}
  onChange={handleImageChange}
/>

</label>

        </div>

        <div className={`fade-in ${showFields ? "show delay-3" : ""}`}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            disabled
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Email"
            style={{
              width: "100%",
              padding: "0.7rem",
              marginTop: "0.5rem",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div className={`fade-in ${showFields ? "show delay-4" : ""}`}>
          <label>Phone</label>
          <input
            type="number"
            value={phone}
            disabled
            onChange={(e) => setPhone(e.target.value)}
            required
            placeholder="Phone Number"
            style={{
              width: "100%",
              padding: "0.7rem",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div className={`fade-in ${showFields ? "show delay-5" : ""}`}>
          <label>Username</label>
          <input
            type="text"
            value={username}
            disabled
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="Username"
            style={{
              width: "100%",
              padding: "0.7rem",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        <div className={`fade-in ${showFields ? "show delay-6" : ""}`}>
          <label>Fullname</label>
          <input
            type="text"
            value={fullname}
            disabled={!isEditing}
            onChange={(e) => setFullName(e.target.value)}
            required
            placeholder="Full Name"
            style={{
              width: "100%",
              padding: "0.7rem",
              marginBottom: "10px",
              borderRadius: "4px",
              border: "1px solid #ccc",
            }}
          />
        </div>
        <div className={`fade-in ${showFields ? "show delay-6" : ""}`}>
  <label>Agent ID</label>
  <input
    type="text"
    value={agentId !== null ? agentId.toString() : ""}
    disabled
    style={{
      width: "100%",
      padding: "0.7rem",
      marginBottom: "10px",
      borderRadius: "4px",
      border: "1px solid #ccc",
      backgroundColor: "#f3f3f3",
    }}
  />
</div>


        <div className="flex-details-profile">
           <div className={`fade-in ${showFields ? "show delay-6" : ""}`}>
    <div className="change-password"
        onClick={()=>{navigate("/reset-password")}}
        >
          Change Password
        </div>
           </div>
    
        <div className="buttons-flex">
          <div>
  <div className={`fade-in ${showFields ? "show delay-6" : ""}`} style={{ marginTop: "10px", }} title="Edit Profile">
          <button className="btn-edit-profile" onClick={isEditing ? handleSave : () => setIsEditing(true)}>
            {isEditing ? "Save" : <i className="bi bi-pencil-square"></i>}
          </button>
        </div>
          </div>
          
          <div>
  <div className={`fade-in ${showFields ? "show delay-6" : ""}`} style={{ marginTop: "10px"}}
  title="Disable Account">
    <button onClick={handleDisableAccount}
    className="btn-delete">
      <i className="bi bi-trash3"></i>
          </button>
        </div>
          </div>
        </div>
         </div>
      </div>
    </div>
    </>
  );
}
