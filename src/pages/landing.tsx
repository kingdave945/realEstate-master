import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./landing.css";

import myImage from "../assets/a711a9f723195ff37d6eda18462ceee5-phoenix tower billboard 2025.png"

export default function Landing() {
 
  const navigate = useNavigate();

  const[search, setSearch]=  useState("")

  const handleSearch = () => {
    // Navigate to /properties?search=yourInput
    navigate(`/properties?search=${encodeURIComponent(search)}`);
  };

    const [mobileview, setMobileView] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setMobileView(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
    <div className="landing">
    <img src={myImage} alt="" />
    </div>
   
      <div>
       {mobileview ?
        (
<div className="mobile-view">
  <div className="home-hero-innerII">
     <h1 className="text-center">
      Find your Dream Home
    </h1>
  </div>
  <div className="search-btn-btn">
      <div id="landingII">
            <input
              className="Search"
              type="text"
              placeholder="Enter a location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
  </div>
</div>
       ):
       (
    <div>
    <div className="home-hero-inner">
    <h1 className="text-center">
      Find your Dream Home
    </h1>
    </div>
   <div className="landing-content">
        
          <div id="landing">
            <input
              className="Search"
              type="text"
              placeholder="Enter a location"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
</div>
       )
       }
       
   
      
      </div>
    </>
  );
}
