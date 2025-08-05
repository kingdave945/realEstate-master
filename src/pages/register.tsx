
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../Api";
import "../pages/register.css";
import { toast } from 'react-toastify';
import api from "../Api/Interceptor";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState<{ id: string; name: string }[]>([]); 
  const [roleId, setRoleId] = useState(""); 
  const [role, setRole] = useState(""); // 

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  // Fetch roles from API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get("/api/Auth/roles");
        setRoles(response.data); // save array of roles
      } catch (error) {
        console.error("Error fetching roles:", error);
      }
    };

    fetchRoles();
  }, []);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!roleId) {
      alert("Please select a role before signing up.");
      return;
    }


    const form = {
      email,
      password,
      fullName,
      userName,
      phoneNumber,
      roleId, 
      role
    };
console.log("Form data being sent:", form);
    try {
      await register(form);
      toast.success("Account Registered! Please confirm your email.");
      navigate("/login");
    } catch (error: any) {
      console.log("error", error);
      toast.error(
        error.response?.data?.message ||
        error.response?.data?.[0]?.description ||
        "Registration failed."
      );
    }
  };

  const inputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    validatePassword(newPassword);
  };

  const validatePassword = (password: string) => {
    const errors: string[] = [];
    if (password.length < 10) errors.push("Password must be at least 10 characters long");
    if (password.length > 24) errors.push("Password must be at most 24 characters long");
    if (password.includes(" ")) errors.push("Password cannot contain spaces");
    if (!/[0-9]/.test(password)) errors.push("Password must contain at least one number");
    if (!/[A-Z]/.test(password)) errors.push("Password must contain at least one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("Password must contain at least one lowercase letter");
    setPasswordErrors(errors);
  };

  return (
    <div className="sign">
      <div className="signup">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div>
         <div>
  <select
    id="role"
    value={roleId}
    onChange={(e) => {
      const selectedId = e.target.value;
      setRoleId(selectedId);

      // find the role name using the selectedId
      const selectedRole = roles.find((r) => r.id === selectedId);
      if (selectedRole) setRole(selectedRole.name);
    }}
  >
    <option value="">Select Role</option>
    {roles.map((role) => (
      <option key={role.id} value={role.id}>
        {role.name}
      </option>
    ))}
  </select>

  <input
    type="text"
    value={roleId}
    readOnly
    placeholder="Role ID will appear here"
  />
</div>


          </div>

          <div>
            <input
              type="text"
              className="fullName-input"
              name="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Full Name"
              required
            />
          </div>

          <div>
            <input
              type="text"
              className="fullName-input"
              name="username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username"
              required
            />
          </div>

          <div>
            <input
              type="text"
              className="fullName-input"
              name="phoneNumber"
              value={phoneNumber}
              pattern="^[0-9]{11,}$"
              placeholder="Phone Number"
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div>
            <input
              className="email-input"
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="password-input">
            <input
              id="password-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={inputChange}
              required
            />
            <div onClick={togglePasswordVisibility} style={{ cursor: "pointer" }}>
              {showPassword ? (
                <i className="bi bi-eye"></i>
              ) : (
                <i className="bi bi-eye-slash"></i>
              )}
            </div>
          </div>

          <button type="submit">Sign Up</button>
        </form>

        {passwordErrors.length > 0 && (
          <ul style={{ color: "red", fontSize: "14px" }}>
            {passwordErrors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}