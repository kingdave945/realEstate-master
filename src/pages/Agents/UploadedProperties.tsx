import { deleteProperty } from "../../Api";
import "../Agents/UploadedPropertyCard.css"; 
import {toast} from 'react-toastify'
export default function UploadedPropertyCard({ property , onDelete}: { property: any; onDelete: (id: number) => void }) {

const handleDeleteProperty = async () => {
  try {
    await deleteProperty(property.id);
toast.success(`${property.title} has been successfully deleted!`,{
  autoClose: 500, 
});
   onDelete(property.id);

  } catch (error: any) {
    toast.error(error.response?.data?.message || `Failed to delete ${property.title}.` ,{
      autoClose:500,
    });
    console.error("Delete error:", error);
  }
};

  return (
    <div className="uploaded-property-card">
      <div>
         <img src={property.imageUrl} alt={property.title} className="property-image" />
      </div>
     
      <div className="property-info">
        <h3>{property.title}</h3>
        <p><strong>Location:</strong> {property.location}, {property.state}</p>
        <p><strong>Price:</strong> ₦{Number(property.price).toLocaleString()}</p>
        <p><strong>Type:</strong> {property.propertyType}</p>
        <p><strong>Value:</strong> {property.propertyValue}</p>
        <p><strong>Posted:</strong> {new Date(property.datePosted).toLocaleString()}</p>
      </div>
      <div className="property-actions" onClick={handleDeleteProperty}>
         <i className="bi bi-trash3"
         title={`Delete  ${property.title}`}></i>
      </div>
    </div>
  );
}
