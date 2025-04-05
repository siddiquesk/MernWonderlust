import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function IndexListing() {
  const [listings, setListings] = useState([]);

  // ==============================================
  // useEffect: Fetch listings from backend on mount
  // ==============================================
  useEffect(() => {
    const getAllListingData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/listings"
        );
        setListings(response.data); // Update state with fetched listings
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    getAllListingData();
  }, []);

  // ==============================================
  // JSX to render all listings with links to detail pages
  // ==============================================
  return (
    <>
      <div className="container-fluid p-3 mt-4">
        <div className="row p-3">
          {listings.map((listing) => (
            <div
              key={listing._id}
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4"
              style={{ border: "none", borderRadius: "10px" }}>
              <Link
                to={`/listings/${listing._id}`}
                className="text-decoration-none text-dark">
                <div
                  className="card h-100"
                  style={{
                    width: "300px",
                    border: "none",
                  }}>
                  <img
                    src={listing.image}
                    className="card-img-top"
                    alt={listing.title}
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      width: "100%",
                    }}
                  />
                  <div className="card-body">
                    <div className="d-flex gap-3 mb-2">
                      <span className="card-text">
                        <b>{listing.location}</b>
                      </span>
                      <span className="card-text">
                        <b>{listing.country}</b>
                      </span>
                    </div>
                    <h5 className="card-title">{listing.title}</h5>
                    <p className="card-text">
                      {listing.description.length > 100
                        ? listing.description.substring(0, 100) + "..."
                        : listing.description}
                    </p>
                    <p className="card-text fw-bold text-success">
                      ₹{listing.price} /day/week
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default IndexListing;
