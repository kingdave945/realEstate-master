import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { receivedWatchlist } from "../Api";
import { getUserDetails } from "../Api/saveDetails";
import NavBar from "./navbar";
import  './watchlist.css'
import { deleteWatchlist } from "../Api";
import{toast} from 'react-toastify'
interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
}

export default function WatchlistTable() {
  const [watchlist, setWatchlist] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user =
    getUserDetails("user") ||
    getUserDetails("agent") ||
    getUserDetails("admin");

  const userEmail = user?.email;

  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!userEmail) return;

      try {
        const data = await receivedWatchlist(userEmail, 1);
        setWatchlist(data.data); // Adjust if response structure is different
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWatchlist();
  }, [userEmail]);

  const handleClick = (id: number) => {
    navigate(`/properties/${id}`);
  };
const deleteFromWatchList = async (property: Property) => {
  try {
    await deleteWatchlist(property.id, userEmail); // FIXED ARGUMENT ORDER
    toast.success("Removed from watchlist successfully.");
    setWatchlist((prev) => prev.filter((item) => item.id !== property.id));
  } catch (error: any) {
    toast.error(error.response?.data?.message || "Failed to remove from watchlist.");
    console.error("Delete error:", error);
  }
};

  return (
    <div style={{ display: "flex" }}>
      <NavBar />

      <table className="watchlist-table" style={{ marginTop: "50px" }}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Location</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                Loading...
              </td>
            </tr>
          ) : watchlist.length > 0 ? (
            watchlist.map((property) => (
              <tr
                key={property.id}
                onClick={() => handleClick(property.id)}
                style={{ cursor: "pointer" }}
              >
                <td>{property.title}</td>
                <td>{property.location}</td>
                <td>{property.price}</td>
                <td
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteFromWatchList(property);
                  }}
                >
                  <i className="bi bi-trash3"></i>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} style={{ textAlign: "center" }}>
                No watchlist items found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
