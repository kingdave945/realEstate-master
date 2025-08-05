import { useState } from "react";
import { toast } from 'react-toastify';

import "./login.css";
import NavBar from "./navbar";

import axios from "axios";
export default function ForgetPassword() {
  const [email, setEmail] = useState("");

  const handleForgetPassword = async (email: string) => {
    if (!email.trim()) {
      toast.error("Email is required.");
      return;
    }
      try {
      await axios.post("http://kendis-001-site1.ntempurl.com/api/Auth/forgot-password", {
        email
      });
      toast.success("A Reset Link has been Sent")
    }
    catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send reset link.");
    }
  };

  return (
    <>
    <NavBar/>
    <div className="logins">
      <div className="login">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleForgetPassword(email);
          }}
        >
         
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
          <button type="submit">
            Reset Your Password
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
