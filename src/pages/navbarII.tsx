import "./navBarII.css";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
export default function NavBarII() {
  const navigate = useNavigate();
  const UsToken = sessionStorage.getItem("Ustoken");
  const AdToken = sessionStorage.getItem("Adtoken");
  const AgToken = sessionStorage.getItem("Agtoken");
  const isLoggedIn = !!(UsToken || AdToken || AgToken);
  // const handleLogout = () => {
  //   sessionStorage.removeItem("Ustoken");
  //   sessionStorage.removeItem("Adtoken");
  //   sessionStorage.removeItem("Agtoken");
  //   navigate("/");
  // };
  console.log("isLoggedIn", isLoggedIn);
  console.log("UsToken", UsToken);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const isMobile = window.innerWidth < 768;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(true);
      else setOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const navItems = [
    { label: "Agent", icon: "", path: "/agent" },
    { label: "Services", icon: "", path: "/" },
    { label: "Area Guide", icon: "", path: "/" },
    { label: "Insights", icon: "", path: "/" },
    { label: "Post Property", icon: "", path: "/" },
    //CHECK IF USER IS LOGGED IN
    // { label: 'Admin', icon: '', path: '/agent/admin' },
  ];
  return (
    // <nav className="navII">
    //   <div className="nav-linkII">
    //     <div>
    //       <h3
    //         className="dream-home"
    //         onClick={() => navigate("/")}
    //       >
    //         Find Your Dream Home
    //       </h3>
    //     </div>
    //     <div>
    //       <Link to="/agent">Agent</Link>
    //     </div>
    //     <div>
    //       <Link to="/register">Services</Link>
    //     </div>
    //     <div>
    //       <Link to="/register">Area Guide</Link>
    //     </div>
    //     <div>
    //       <Link to="/register">Insights</Link>
    //     </div>
    //     <div>
    //       <Link to="" className="post-property">
    //         Post Property
    //       </Link>
    //     </div>
    //     {isLoggedIn ? (
    //       <>
    //         <div>
    //           <button onClick={handleLogout} style={{ background: "none", border: "none", color:" #1e1e46",fontFamily:"Work Sans, sans-serif", cursor: "pointer" }}>
    //             Log Out
    //           </button>
    //         </div>
    //         <div>
    //           <Link to="/a">My Account</Link>
    //         </div>
    //       </>
    //     ) : (
    //       <>
    //         <div>
    //           <Link to="/register">Sign Up</Link>
    //         </div>
    //         <div>
    //           <Link to="/login">Login</Link>
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </nav>

    <>
      {/* Hamburger Icon */}
      <div className="header-nav">
        <h3 className="dream-home" onClick={() => navigate("/")}>
          Find Your Dream Home
        </h3>

        {isMobile && !open && (
          <button
            onClick={() => setOpen(true)}
            className="nav-hamburger"
            aria-label="Open sidebar"
          >
            <i className="bi bi-list"></i>
          </button>
        )}
      </div>
      {/* Overlay */}
      {isMobile && open && (
        <div
          className="agent-sidebar__overlay"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={[
          "nav-sidebar",
          open ? "agent-sidebar--visible" : "agent-sidebar--hidden",
        ].join(" ")}
      >
        <h2
          style={{ display: "flex", alignItems: "center" }}
          className="agent-sidebar__title"
        >
          <h3 className="dream-homeII" onClick={() => navigate("/")}>
            Find Your Dream Home
          </h3>
          {isMobile && open && (
            <>
              <button
                style={{
                  textAlign: "center",
                  padding: "10px",
                  marginLeft: "10px",
                  backgroundColor: "transparent",
                  fontSize: "20px",
                  color: "red",
                  border: "none",
                }}
                onClick={() => setOpen(false)}
                className=""
              >
                X
              </button>
            </>
          )}
        </h2>

        <ul className="agent-sidebar__nav-list">
          {navItems.map((item) => (
            <li key={item.label} className="agent-sidebar__nav-item">
              <Link
                to={item.path}
                className={[
                  "sidebar__link",
                  location.pathname === item.path
                    ? "sidebar__link--active"
                    : "",
                ].join(" ")}
                onClick={() => isMobile && setOpen(false)}
              >
                <span className="agent-sidebar__icon">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        {/* Close button for mobile */}
        <span className="agent-sidebar__nav-item agent-sidebar__close-btn">
          <Link to="" className="agent-sidebar__link">
            <span className="agent-sidebar__icon"></span>Logout
          </Link>
        </span>
      </aside>
    </>
  );
}
