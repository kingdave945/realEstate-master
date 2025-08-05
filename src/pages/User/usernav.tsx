import { useState } from "react"
export default function UserNav() {
  const userSidebar=[
    { icon: "bi bi-house", label: "Find Your Dream Home" },
    { icon: "bi bi-person", label: "Profile" },
    { icon: "bi bi-envelope", label: "Messages" },
    { icon: "bi bi-gear", label: "Settings" },
  ]
  const userSidebarII=[
    { icon: "bi bi-house", },
    { icon: "bi bi-person", },
    { icon: "bi bi-envelope", },
    { icon: "bi bi-gear", },

  ]
  const [activeIndex, setActiveIndex] = useState(true);
  const [arrow, setArrow] = useState(false);
  return(
    <div  style={{
      display: "flex",
      alignItems: "center",


    }}>
        {activeIndex ? 
        (
<div>
     <ul style={{
        backgroundColor: "#1e1e46",
        color: "white",

        listStyleType: "none",
        height: "100vh",
      }}>
        {userSidebarII.map((item, index) => (
          <li key={index} style={{
            padding: "10px 20px",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            transition: "background-color 0.2s"
          }}>
            <i className={item.icon} style={{ marginRight: 10 }}></i>
         
          </li>
        ))}
      </ul>
</div>
        ):
        (
 <div style={{
      
    }}>
      <ul style={{
        backgroundColor: "#1e1e46",
        color: "white",
        listStyleType: "none",
        height: "100vh",
      }}>
        {userSidebar.map((item, index) => (
          <li key={index} style={{
            padding: "10px 20px",
            marginBottom: "30px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            transition: "background-color 0.2s"
          }}>
            <i className={item.icon} style={{ marginRight: 10 }}></i>
            {item.label}
          </li>
        ))}
      </ul>
     
       
      </div>
        )
        }
<div style={{
  marginBottom: "250px",
}}>
  {arrow ? (
 <div onClick={() =>{ 
   setActiveIndex(false),
  setArrow(!arrow)
}
 } >
    <i className="bi bi-chevron-left"></i>
   </div>
  )
  :
  (
   <div onClick={() =>{
    setArrow(!arrow)
   setActiveIndex(true) 
  }
   }>
    <i className="bi bi-chevron-right"></i>
   </div>
  )}
   </div>
</div>
  
  )
}