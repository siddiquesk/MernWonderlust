import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast"; // ✅ Toast import

function ShowListing() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [review, setReview] = useState({ comment: "", rating: "" });
  const [showreview, setShowreview] = useState([]);
  const [validated, setValidated] = useState(false);

  const fetchListing = async () => {
    try {
      const response = await axios.get(
        `https://sufiyan-airbnb-vella.onrender.com/api/v1/listings/${id}`
      );
      setListing(response.data);
    } catch (error) {
      console.error("Error fetching listing:", error);
      toast.error("Failed to fetch listing!");
    }
  };

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        `https://sufiyan-airbnb-vella.onrender.com/api/v1/listings/${id}/reviews`
      );
      setShowreview(response.data.reviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
      toast.error("Failed to fetch reviews!");
    }
  };

  useEffect(() => {
    fetchListing();
    fetchReviews();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://sufiyan-airbnb-vella.onrender.com/api/v1/listings/${id}`);
      toast.success("Listing deleted successfully!"); // ✅ Toast
      navigate("/");
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Failed to delete listing!"); // ✅ Toast
    }
  };

  const reviewDelete = async (reviewId) => {
    try {
      await axios.delete(
        `https://sufiyan-airbnb-vella.onrender.com/api/v1/listings/${id}/reviews/${reviewId}`
      );
      toast.success("your Review deleted!"); // ✅ Toast
      fetchReviews();
    } catch (err) {
      console.log("Error deleting review:", err);
      toast.error("Failed to delete review!"); // ✅ Toast
    }
  };

  const handleChange = (e) => {
    setReview({ ...review, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setValidated(true);

    if (!review.comment.trim()) return;

    try {
      await axios.post(
        `https://sufiyan-airbnb-vella.onrender.com/api/v1/listings/${id}/reviews`,
        review
      );
      toast.success("Review add successfully!"); // ✅ Toast
      fetchReviews();
      setValidated(false);
      setReview({ comment: "", rating: "" });
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("Failed to submit review!"); // ✅ Toast
    }
  };

  if (!listing) return <h2>No listing found</h2>;
  if (!showreview) return <h2>No Reviews found</h2>;

  return (
    <div className="container mt-4">
      {/* Listing Info */}
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-sm-12">
          <h2 className="text-center mb-3" style={{ color: "maroon" }}>
            {listing.title}
          </h2>
          <div className="text-center mb-4">
            <img
              src={listing.image}
              alt={listing.title}
              className="img-fluid rounded"
              style={{ maxHeight: "430px", objectFit: "cover" }}
            />
          </div>

          <ul
            className="list-unstyled px-md-5 text-secondary"
            style={{ fontSize: "1.1rem" }}>
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

          {/* Action Buttons */}
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

      {/* Leave a Review */}
      <hr className="mt-3 mb-3" />
      <div className="col-lg-8 col-md-10 col-sm-12 offset-2">
        <h4 className="mb-3">Leave a Review</h4>
        <form
          noValidate
          className={`needs-validation ${validated ? "was-validated" : ""}`}
          onSubmit={handleSubmit}>
          <div className="col-lg-10 col-md-8 col-sm-10 p-2">
            <label htmlFor="rating" className="form-label">
              Rating
            </label>
            <input
              type="range"
              name="rating"
              id="rating"
              className="form-range"
              min={0}
              max={5}
              value={review.rating}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-2 col-lg-10 col-md-8 col-sm-10 p-2">
            <label htmlFor="comment" className="form-label">
              Comment
            </label>
            <textarea
              name="comment"
              id="comment"
              className={`form-control ${
                validated && !review.comment.trim() ? "is-invalid" : ""
              }`}
              placeholder="Provide your comment"
              style={{ height: "100px" }}
              value={review.comment}
              onChange={handleChange}
              required></textarea>
            <div className="invalid-feedback">Comment is required</div>
          </div>

          <button type="submit" className="btn btn-outline-dark m-2">
            Submit Review
          </button>
        </form>
      </div>

      {/* Show All Reviews */}
      <hr />
      {showreview.length > 0 && (
        <div className="mt-4">
          <h4 className="mb-3">Reviews</h4>
          {showreview.map((myreview) => (
            <div
              key={myreview._id}
              className="border rounded p-4 mb-2 d-flex justify-content-between">
              <div>
                Rating: {myreview.rating} / 5 <br />
                Comment: {myreview.comment}
              </div>
              <button
                className="btn btn-dark"
                onClick={() => reviewDelete(myreview._id)}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowListing;

/*
Action	Route	Method
Get Listing	/api/v1/listings/:id	GET
Get Reviews	/api/v1/listings/:id/reviews	GET
Post Review	/api/v1/listings/:id/reviews	POST
Delete Listing	/api/v1/listings/:id	DELETE
Delete Review	/api/v1/listings/:id/reviews/:reviewId	DELETE
*/
