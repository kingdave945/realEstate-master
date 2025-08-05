import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  return (

    <div className="logins">
      <div className="login">
        <h1>Admin Login Page</h1>
        <h3><Link to="/login/agent">Agent</Link><span><span> / </span><Link to="/login/admin">Admin</Link></span></h3>
        <p>Please enter your credentials to log in.</p>
        <form>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" required />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button onClick={()=>{navigate("/admin")}} type="submit">Login</button>
        </form>
      </div>
    </div>
  );
}
