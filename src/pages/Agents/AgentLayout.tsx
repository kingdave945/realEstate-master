import { Outlet } from "react-router-dom";
import AgentSidebar from "./AgentSidebar";
import AgentNav from "./Nav";
import NavBar from "../navbar";
import { useEffect, useState } from "react";
import { getUserDetails } from "../../Api/saveDetails";
import AgentSkeleton from "./AgentSkeleton"; 
function AgentLayout() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [agent, setAgent] = useState<any>(null);

  const [sideBar, setSideBar] = useState(false);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const [outletloading, setOutletLoading] = useState(true);
     useEffect(() => {
    const timer = setTimeout(() => {
      setOutletLoading(false);
    }, 1000)

    return () => clearTimeout(timer);
  }, []);

// ; // Example usage of addNum function
  // if (loading) {
  //   return <AgentSkeleton />;
  // }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        overflowY: "scroll",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      {isMobile ? <div></div> : <NavBar />}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {/* Top Navigation */}
        <div style={{ flex: 1 }}>
          <div style={{ marginTop: "50px" }}>
            <AgentNav
             
              sideBar={sideBar}
              setSideBar={setSideBar}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div style={{ display: "flex", height: "100vh" }}>
          {/* Sidebar */}
          {sideBar ? (
            <div>
              <AgentSidebar />
            </div>
          ) : (
            <div></div>
          )}

          {/* Outlet Content */}
          <main
            style={{
              flex: 1,
              overflowY: "scroll",
              padding: "20px",
              height: "100vh",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div style={{ marginTop: "50px" }}>
             {outletloading ? <AgentSkeleton/> : <Outlet/>} 
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default AgentLayout;
