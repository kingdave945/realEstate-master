import "./ListCard.css";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../Api/saveDetails";
import { addToWatchlist } from "../Api";
import {toast} from 'react-toastify'
interface ListCardProps {
  id: number;
  title: string;
  location: string;
  price: string;
  imageUrl: string;
}

export default function ListCard({
  id,
  title,
  location,
  imageUrl,
  price,
}: ListCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/properties/${id}`);
  };

  const user =
    getUserDetails("user") ||
    getUserDetails("agent") ||
    getUserDetails("admin") ||
    null;

  const userEmail = user?.email || null;

const handleAddToWatchlist = async (
  e: React.MouseEvent<HTMLElement>
) => {
  e.stopPropagation();

  if (!userEmail) {
    alert("You must be logged in to add to watchlist.");
    return;
  }

  try {
    await addToWatchlist(id, userEmail);
    toast.success("Property added to watchlist!");
  } catch (error: any) {
    const message = error?.response?.data;

    if (message === "Property already in watchlist") {
      toast.error("This property is already in your watchlist.");
    } else if (message === "User not found") {
      toast.error("User not found. Please log in again.");
    } else {
      console.error("Failed to add to watchlist:", error);
      toast.error("Failed to add to watchlist.");
    }
  }
};


  return (
    <div className="property-card" onClick={handleClick} tabIndex={0} role="button">
      <img src={imageUrl} alt="Property" className="property-image" />
      <div className="price-add-icon">
        <div className="price-tag">{price}</div>
        <i
          className="bi bi-plus-lg"
          title="Add to Watchlist"
          onClick={handleAddToWatchlist}
        ></i>
      </div>
      <h3>{title}</h3>
      <p>{location}</p>
    </div>
  );
}
