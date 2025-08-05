import "./navBar.css";
import { Link, useNavigate,  } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../Api/Interceptor";
function NavBar() {
  const navigate = useNavigate();
  const UsToken = sessionStorage.getItem("Ustoken");
  const AdToken = sessionStorage.getItem("Adtoken");
  const AgToken = sessionStorage.getItem("Agtoken");
  const isLoggedIn = !!(UsToken || AdToken || AgToken);

  const handleLogout = () => {
    sessionStorage.clear(); // Clear all session storage items
    // ("Ustoken");
    // sessionStorage.removeItem("Adtoken");
    // sessionStorage.removeItem("Agtoken");
    navigate("/");
  };
const [notificationCount, setNotificationCount] = useState(0);

useEffect(() => {
  if (AgToken) {
    // Fetch notifications count
    const fetchNotifications = async () => {
      try {
        const res = await api.get("/api/notifications/count", {
          headers: { Authorization: `Bearer ${AgToken}` }
        });
        setNotificationCount(res.data.count);
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
    const interval = setInterval(fetchNotifications, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }
}, [AgToken]);

  console.log("isLoggedIn", isLoggedIn);
  console.log("UsToken", UsToken);
  console.log("AdToken", AdToken);
  console.log("AgToken", AgToken);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const token = sessionStorage.getItem("Ustoken");
  const tokenII = sessionStorage.getItem("Agtoken");
//  if (!token) {
//     return
//  }
const profilelink = token ? "/user-profile" : tokenII ? "/agent-profile" : "/login";
  return (
    <nav className="nav">
      <div className="nav-link">
        <div>
          <h3
            className="dream-home"
            onClick={() => navigate("/")}
            style={{cursor:"pointer"}}
          >
            Find Your Dream Home
          </h3>
        </div>
        <div>
          <Link to="/agent">Agent</Link>
        </div>
        <div>
          <Link to="/">Services</Link>
        </div>
        <div>
          <Link to="/">Area Guide</Link>
        </div>
        <div>
          <Link to="/watchlist">My Watchlist</Link>
        </div>
        <div>
          <Link to="" className="post-property">
            Post Property
          </Link>
        </div>
        {isLoggedIn ? (
          <>
           
            <div  style={{cursor:"pointer"}}>
              <ul className="nav-ul">
                <li>My Account
                  <ul className="nav-ul-dropdown">
                    <li onClick={() => 
                     navigate(profilelink)}>
                        My Profile
                      </li>
                    <li>Something</li>
                  </ul>
                </li>

              </ul>
            </div>
          <div>
          

          </div>
             <div>
              <button onClick={handleLogout} style={{ background: "none", border: "none", color:" #1e1e46",fontFamily:"Work Sans, sans-serif", cursor: "pointer" }}>
                Log Out
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <Link to="/register">Sign Up</Link>
            </div>
            <div>
              <Link to="/login">Login</Link>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
