import NavBar from "../navbar";
import UserMain from "./usermain";

export default function UserLayout() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div>
        <NavBar />
      </div>
      <div
        className="user-layout"
        style={{
          display: "flex",
          marginTop: "49px",
          backgroundColor: "#f0f0f0",
        }}
      >
    

        <UserMain />
      </div>
    </div>
  );
}
