import NavBar from "../navbar";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [email, setEmail] = useState(searchParams.get("email") || "");


  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !oldPassword || !newPassword ) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const payload = {
        email,
        oldPassword,
        newPassword,
        
      };

      console.log("Sending payload:", payload);

      await axios.post("http://kendis-001-site1.ntempurl.com/api/Auth/reset-password", payload);

      toast.success("Password reset successfully.");
      navigate("/user-profile");
    } catch (error: any) {
      console.error("Reset error:", error.response?.data);
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.title ||
        "Password reset failed."
      );
    }
  };

  return (
    <>
      <NavBar />
      <div className="reset-password">
        <div className="login">
          <h2>Reset Your Password</h2>
          <form onSubmit={handleReset}>
            <div>
              <input
                type="text"
                placeholder="Enter your email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="password-input-login">
              <input
                type={showPassword ? "text" : "password"}
                name="oldPassword"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                style={{
                  border:"none",
                }}
                placeholder="Old Password"
              />
              <div onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                {showPassword ? <i className="bi bi-eye" /> : <i className="bi bi-eye-slash" />}
              </div>
            </div>

            <div className="password-input-login">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="New Password"
                  style={{
                  border:"none",
                }}
              />
              <div onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
                {showPassword ? <i className="bi bi-eye" /> : <i className="bi bi-eye-slash" />}
              </div>
            </div>

            <button type="submit">Reset</button>
          </form>
        </div>
      </div>
    </>
  );
}
