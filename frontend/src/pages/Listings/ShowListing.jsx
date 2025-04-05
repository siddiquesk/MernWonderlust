import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function ShowListing() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/listings/${id}`
        );
        setListing(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/api/v1/listings/${id}`);
      navigate("/");
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  if (!listing) return <h2>No listing found</h2>;

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <h2 className="text-center mb-3" style={{ color: "maroon" }}>
            Listing Details
          </h2>

          {/* Image */}
          <div className="text-center mb-4">
            <img
              src={listing.image}
              alt={listing.title}
              className="img-fluid rounded"
              style={{ maxHeight: "430px", objectFit: "cover" }}
            />
          </div>

          {/* Listing Info */}
          <ul
            className="list-unstyled px-md-5 text-secondary "
            style={{ fontSize: "1.1rem" }}>
            <li className="mb-2">
              <strong className="text-dark">Title:</strong> {listing.title}
            </li>
            <li className="mb-2">
              <strong className="text-dark">Description:</strong>{" "}
              {listing.description}
            </li>
            <li className="mb-2">
              <strong className="text-dark">Price:</strong> ₹{listing.price}
            </li>
            <li className="mb-2">
              <strong className="text-dark">Location:</strong>{" "}
              {listing.location}
            </li>
            <li className="mb-2">
              <strong className="text-dark">Country:</strong> {listing.country}
            </li>
          </ul>

          {/* Buttons */}
          <div className="d-flex justify-content-center gap-5 mt-4 mb-3">
            <Link
              to={`/listings/${listing._id}/edit`}
              className="btn btn-outline-primary">
              Edit Listing
            </Link>
            <button onClick={handleDelete} className="btn btn-outline-danger">
              Delete Listing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowListing;
