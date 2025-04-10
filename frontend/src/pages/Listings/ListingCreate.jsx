import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function ListingCreate() {
  const [createListing, setCreateListing] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    location: "",
    country: "",
  });

  const navigate = useNavigate();
  const formRef = useRef(null);

  const handleChange = (e) => {
    setCreateListing({
      ...createListing,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = formRef.current;

    if (form.checkValidity() === false) {
      e.stopPropagation();
    } else {
      try {
        await axios.post(
          "https://sufiyan-airbnb-vella.onrender.com/api/v1/listings",
          createListing
        );

        // ✅ Show success toast
        toast.success("Listing created successfully!", {
          duration: 2000,
          position: "top-center",
          style: {
            backgroundColor: "#8B0000", // Bootstrap green
            color: "#fff",
            fontWeight: "bold",
            fontSize: "16px",
            borderRadius: "10px",
            padding: "15px",
          },
        });

        // 🔁 Delay before redirecting to homepage
        setTimeout(() => {
          navigate("/");
        }, 500);
      } catch (error) {
        console.error("Error creating listing:", error);
        toast.error("Something went wrong!");
      }
    }

    form.classList.add("was-validated");
  };

  return (
    <div className="container py-4">
      <h2 className="text-center text-primary mb-2">Create Your Listing</h2>
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="needs-validation"
            noValidate>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                placeholder="Add a catchy title"
                value={createListing.title}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Title is required.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                placeholder="Enter your description"
                value={createListing.description}
                onChange={handleChange}
                required></textarea>
              <div className="invalid-feedback">Description is required.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                id="image"
                className="form-control"
                placeholder="Enter image URL"
                value={createListing.image}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Image URL is required.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="price" className="form-label">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                className="form-control"
                placeholder="Enter price"
                value={createListing.price}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Price is required.</div>
            </div>

            <div className="mb-3">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                name="location"
                id="location"
                className="form-control"
                placeholder="Enter location"
                value={createListing.location}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Location is required.</div>
            </div>

            <div className="mb-4">
              <label htmlFor="country" className="form-label">
                Country
              </label>
              <input
                type="text"
                name="country"
                id="country"
                className="form-control"
                placeholder="Enter country"
                value={createListing.country}
                onChange={handleChange}
                required
              />
              <div className="invalid-feedback">Country is required.</div>
            </div>

            <div className="text-center">
              <button type="submit" className="btn btn-success w-50">
                Create Listing
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ListingCreate;
