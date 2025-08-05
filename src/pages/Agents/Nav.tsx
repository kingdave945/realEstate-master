import { getUserDetails } from "../../Api/saveDetails";
interface Navprops{

  sideBar:boolean;
  setSideBar:React.Dispatch<React.SetStateAction<boolean>>;    
}
export default function AgentNav({ sideBar, setSideBar}:Navprops){
   const user = getUserDetails("user") || getUserDetails("agent") || getUserDetails("admin") || null;
    const name = user?.fullName || "User";
  return(
    <>
      <div style={{display:"flex",padding:"10px",
       justifyContent:"space-between",
      backgroundColor:"#1e1e46", color:"white", position: "fixed", width: "99%", zIndex:"1", top: "44px", right: "0", left: "0",
       
      }}>
       {sideBar ? (
        <div>
         <div
          onClick={() => {
            setSideBar(false);
          }}
        >
        <i className="bi bi-layout-sidebar"></i>
        </div>
        </div>
       ):(
        <div>
          <div onClick={()=>{setSideBar(true)}}>
          <i className="bi bi-layout-sidebar-reverse"></i>
          </div>
        </div>
       )}
      
        <p style={{textAlign:"right",width:"100%",margin:"0",
          marginRight:"10px"
        }
      
      }>
          Hello, <strong>{name}</strong> </p>
      </div>
    </>
  )
}