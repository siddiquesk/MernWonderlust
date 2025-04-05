import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";
function ShowListing() {
  const { id } = useParams(); // Get the listing ID from the URL
  const [listing, setListing] = useState([]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/listings/${id}`
        );
        console.log("Fetched listing:", response.data);
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [id]);

  const navigate = useNavigate();
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/listings/${id}`);
      navigate("/"); // Go back to listings page
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  if (!listing) return <h2>No listing found</h2>;

  return (
    <div className="showlisting">
      <h2>Listing Details</h2>
      <ul>
        <li>
          <strong>Title:</strong> {listing.title}
        </li>
        <li>
          <strong>Description:</strong> {listing.description}
        </li>
        <li>
          <strong>Price:</strong> {listing.price}
        </li>
        <li>
          <strong>Location:</strong> {listing.location}
        </li>
        <li>
          <strong>Country:</strong> {listing.country}
        </li>
        <li>
          <img
            src={listing.image}
            alt={listing.title}
            style={{ width: "300px" }}
          />
        </li>
      </ul>
      <br />
      <Link to={`/listings/${listing._id}/edit`}>Edit Listing</Link>
      <button onClick={handleDelete} style={{ marginInline: "10px" }}>
        Delete Listing
      </button>
    </div>
  );
}

export default ShowListing;
