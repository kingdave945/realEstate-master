import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";


const sidebarItems = [
  { label: "Dashboard", icon: "", path: "/admin" },
  { label: "Properties", icon: "", path: "/admin/properties" },
];

const AdminSidebar: React.FC = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

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
      {isMobile && !open && (
        <button
          onClick={() => setOpen(true)}
          className="agent-sidebar__hamburger"
          aria-label="Open sidebar"
        >
          ☰
        </button>
      )}

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
          "agent-sidebarII",
          open ? "agent-sidebar--visible" : "agent-sidebar--hidden",
        ].join(" ")}
      >
        <h2 className="agent-sidebar__title">
          Admin Panel{" "}
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
        <nav>
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
            {/* <li className="agent-sidebar__nav-item">
              <Link to="" className="agent-sidebar__link">
                <span className="agent-sidebar__icon"></span>Logout
              </Link>
            </li> */}
          </ul>
        </nav>

        {/* Close button for mobile */}
        <span className="agent-sidebar__nav-item agent-sidebar__close-btn">
          <Link to="" className="agent-sidebar__link">
            <span className="agent-sidebar__icon"></span>Logout
          </Link>
        </span>
        {/* {isMobile && open && (
          <button
            onClick={() => setOpen(false)}
            className="agent-sidebar__close-btn"
          >
            Close
          </button>
        )} */}
      </aside>
    </>
  );
};

export default AdminSidebar;
