import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function IndexListing() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    const getAllListingData = async () => {
      // ✅ added const
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/listings"
        );
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    getAllListingData();
  }, []);

  return (
    <div className="container">
      <h1>All Listings</h1>
      <Link to="/listings/new">
        <button>Create New Listing</button>
      </Link>

      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            <Link to={`/listings/${listing._id}`}>{listing.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IndexListing;
