import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NavBar from "./navbar";
export default function CreateNewPassword() {

  
  const [password, setPassword] = useState("");
const [email, setEmail] = useState("")

  const navigate = useNavigate();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!password || !email) {
      toast.error("Please fill in all fields");
      return;
    }

    // if (password !== confirmPassword) {
    //   toast.error("Passwords do not match");
    //   return;
    // }

    try {
      await axios.post("http://kendis-001-site1.ntempurl.com/api/Auth/update-change-password", {
        email,
      
        newPassword: password,
      });

      toast.success("Password reset successfully. Please log in.");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };
    const [showPassword, setShowPassword] = useState(false);
const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <>
    <NavBar/>
    <div className="logins">
      <div className="login">
       <h2>Make A new Password</h2>
        <form onSubmit={handleReset}>
           <div>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={email}
            onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
    <div className="password-input-login">
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="New Password"
              />
              <div
                onClick={togglePasswordVisibility}
                style={{ cursor: "pointer" }}
              >
                {showPassword ? (
                  <div>
                    <i className="bi bi-eye"></i>
                  </div>
                ) : (
                  <div>
                    <i className="bi bi-eye-slash"></i>
                  </div>
                )}
              </div>
            </div>
          <button type="submit">Reset Password</button>
        </form>
      </div>
    </div>
    </>
  );
}
