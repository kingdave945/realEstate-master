import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../Agents/AgentSidebar.css'

const sidebarItems = [
  { label: "Dashboard", icon: "", path: "/agent" },
  { label: "Properties", icon: "", path: "/agent/properties" },
  { label: "Messages", icon: "", path: "/agent/messages" },
  { label: "Listing", icon: "", path: "/agent/listing" },
  { label: "Notifications", icon: "", path: "/agent/notifications" },
];
// const secondaryLinks = [
//   { label: "Home", path: "/" },
//   { label: "Services", path: "/" },
//   { label: "Otherlink", path: "#" },
// ];

const AgentSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const [sideBar, setSideBar] = useState(true);
  const isMobile = window.innerWidth < 768;

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(true);
      else setOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Hamburger Icon */}
      {/* {isMobile && !open && (
        <button
          onClick={() => setOpen(true)}
          className="agent-sidebar__hamburger"
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )} */}

      {/* Overlay */}
      {/* {isMobile && open && (
        <div
          className="agent-sidebar__overlay"
          onClick={() => setOpen(false)}
        />
      )} */}

      {/* Sidebar */}
      {sideBar ? (
          <aside
        className={[
          "agent-sidebar",
        
        ].join(" ")}
      >
      
        <h2
          style={{ display: "flex", alignItems: "center" }}
          className="agent-sidebar__title"
        >
          Agent Panel
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

        <div style={{ display: "flex" }}>
          <ul className="agent-sidebar__nav-list">
            {sidebarItems.map((item) => (
              <li key={item.label} className="agent-sidebar__nav-item">
                <Link
                  to={item.path}
                  className={[
                    "agent-sidebar__link",
                    location.pathname === item.path
                      ? "agent-sidebar__link--active"
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
        </div>
        {/* Close button for mobile */}
        <span className="agent-sidebar__nav-item agent-sidebar__close-btn">
         
        </span>
        {isMobile && open && (
          <>
            {/* <button
              onClick={() => setOpen(false)}
              className="agent-sidebar__close-btn"
            >
              Close
            </button> */}
          </>
        )}
      </aside>
      ):(
         <div>
          <div onClick={()=>{setSideBar(true)}}>
          <i className="bi bi-layout-sidebar-reverse"></i>
          </div>
        </div>
      )}
    
    </>
  );
};

export default AgentSidebar;
