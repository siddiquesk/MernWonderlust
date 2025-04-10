import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function IndexListing() {
  const [listings, setListings] = useState([]);

  // ==============================================
  // useEffect: Fetch listings from backend on mount
  // ==============================================
  useEffect(() => {
    const isToastShown = sessionStorage.getItem("welcome-toast-shown");

    const getAllListingData = async () => {
      try {
        const response = await axios.get(
          "https://sufiyan-airbnb-vella.onrender.com/api/v1/listings"
        );
        setListings(response.data);

        if (!isToastShown) {
          toast.success("Welcome to  Wonderlust Website!", {
            duration: 3000,
            position: "top-center",
            style: {
              borderRadius: "10px",
              color: "#8B0000",
              fontWeight: "bold",
              padding: "15px",
              fontSize: "16px",
            },
          });
          sessionStorage.setItem("welcome-toast-shown", "true");
        }
      } catch (error) {
        toast.error("Something went wrong!");
        console.error("Error fetching listings:", error);
      }
    };

    getAllListingData();
  }, []);

  return (
    <>
      {/* 👇 Add toaster with smooth animation settings */}

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
