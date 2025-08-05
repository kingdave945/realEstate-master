import { Outlet, Link } from "react-router-dom";
import "./Layout.css"
import { useState,useEffect } from "react";
import NavBar from "./navbar"
import NavBarII from "./navbarII";
function Layout() {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="layout">
      {/* <nav style={{ display:"flex", padding: '1rem',boxShadow: "0 4px 12px rgba(0,0,0,0.05)",textAlign: 'right' }}>
        <div style={{color:'#03395a',width:"50%", textAlign:'left',fontWeight:'700'}}>Home Find</div>
        <div style={{textAlign: 'right',width:"50%"}}>
    <Link style={{textDecoration:"none", color:'#457b9d',padding:"10px",fontWeight:'500'}} to="/">Home</Link> 
        <Link style={{textDecoration:"none", color:'#457b9d',padding:"10px",fontWeight:'500'}} to="/about">About</Link>
        </div>
        
      </nav> */}
    {isMobile ? (
      <NavBarII/>
      ):
     <NavBar/>
    }

     <div style={{marginTop:"50px"}}>
      <Outlet/>
     </div>
     
    </div>
  );
}

export default Layout;
