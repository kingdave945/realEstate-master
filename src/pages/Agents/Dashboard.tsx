import React from "react";
import ListCard from "../../components/ListCard";

import image1 from "../../assets/licensed-image.jpg";
import image2 from "../../assets/licensed-image (1).jpg";

import "./Dashboard.css";



// const agents = [
//   { id: 1, name: "Jane Doe", properties: 12, sales: 5 },
//   { id: 2, name: "John Smith", properties: 8, sales: 3 },
//   { id: 3, name: "Alice Johnson", properties: 15, sales: 7 },
// ];

const Dashboard: React.FC = () => {
  return (
    <>
      <div style={{padding: "0 20px"}}>
        <h1 className="dashboard-title">My Dashboard</h1>
        <div className="card-container">
          <div className="properties-grid">
            <ListCard
            id={1}
              imageUrl={image2}
              title="The Pork House"
              price="$ 200,000.00"
              location="No 81 Shady Street , Port Harcourt"
              
            ></ListCard>
            <ListCard id={2}
              imageUrl={image1}
              title="The Pork House"
              price="$ 200,000.00"
              location="No 81 Shady Street , Port Harcourt"
            ></ListCard>
            <ListCard id={3}
              imageUrl={image1}
              title="The Pork House"
              price="$ 200,000.00"
              location="No 81 Shady Street , Port Harcourt"
            ></ListCard>
          </div>
        </div>
        {/* <div>
          <h1>My WatchList</h1>
          <WatchList p="This is the watch list page where you can track your favorite items."></WatchList>
          <WatchList p="This is the watch list page where you can track your favorite items."></WatchList>
          <WatchList p="This is the watch list page where you can track your favorite items."></WatchList>
        </div>
        <div>
          <h1>My Notifications</h1>
          <WatchList p="This is the watch list page where you can track your favorite items."></WatchList>
          <WatchList p="This is the watch list page where you can track your favorite items."></WatchList>
          <WatchList p="This is the watch list page where you can track your favorite items."></WatchList>
        </div> */}
      </div>
    </>
  );
};

export default Dashboard;
