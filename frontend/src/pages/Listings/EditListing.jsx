import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditListing() {
  const [editListing, setEditListing] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    location: "",
    country: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/listings/${id}`
        );
        setEditListing(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };

    fetchListing();
  }, [id]);

  const handleChange = (e) => {
    setEditListing({ ...editListing, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/v1/listings/${id}`,
        editListing
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  return (
    <div className="editlisting container mt-4">
      <h2 className="text-center mb-4 text-primary">Edit Your Listing</h2>
      <form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ maxWidth: "600px" }}>
        <input
          type="text"
          name="title"
          className="form-control mb-3"
          placeholder="Enter Your Title"
          value={editListing.title}
          onChange={handleChange}
        />

        <textarea
          name="description"
          className="form-control mb-3"
          placeholder="Enter Your Description"
          value={editListing.description}
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          className="form-control mb-3"
          placeholder="Enter Image URL"
          value={editListing.image}
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          className="form-control mb-3"
          placeholder="Enter Your Price"
          value={editListing.price}
          onChange={handleChange}
        />

        <input
          type="text"
          name="location"
          className="form-control mb-3"
          placeholder="Enter Your Location"
          value={editListing.location}
          onChange={handleChange}
        />

        <input
          type="text"
          name="country"
          className="form-control mb-4"
          placeholder="Enter Your Country"
          value={editListing.country}
          onChange={handleChange}
        />

        <button type="submit" className="btn btn-primary w-100">
          Update Listing
        </button>
      </form>
    </div>
  );
}

export default EditListing;
