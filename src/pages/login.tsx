import { useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import "../pages/login.css";

import { loginAdmin, loginAgent, loginUser } from "../Api";

export default function Login() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const form = { email: `${email}`, password: `${password}` };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) {
      alert("Please select a role before logging in.");
      return;
    }
    setLoading(true);
    try {
      sessionStorage.setItem("role", role);
      sessionStorage.setItem("email", email);
      switch (role) {
        case "agent":
          await loginAgent(form);
          navigate("/auth/2fa");
          break;
        case "user":
          await loginUser(form);
          navigate("/auth/2fa");
          break;
        case "admin":
          await loginAdmin(form);
          navigate("/auth/2fa");
          break;
        default:
          break;
      }
    } 
    catch (error:any) {
     console.log("error", error);
    // alert((error.response?.data?.message || "An error occurred while logging in."));
    toast.error(error.response?.data?.message || "An error occurred while logging in.")
      
    }
    setLoading(false);
  };
  // const notify = () => toast("Wow so easy!");
  return (
    <div className="logins">
      <div className="login">
        <h2>Login Page</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="role">Role:</label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              >
              <option value="">Select Role</option>
              <option value="agent">Agent</option>
              {/* <option value="admin">Admin</option> */}
              <option value="user">User</option>
            </select>
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div> */}
          <div>
            <label htmlFor="password">Password:</label>
            <div className="password-input-login">
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                title="Password"
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
          </div>
<div className="forgot-password-text"
 onClick={() => navigate("/forgot-password")}>
  Forgot Password?
</div>

          <button type="submit" disabled={loading}>
            {loading ?
             "Logging in...."
             : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
