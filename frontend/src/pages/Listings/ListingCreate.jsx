import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function ListingCreate() {
  const [cretaelisting, setcretaelisting] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    location: "",
    country: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setcretaelisting({ ...cretaelisting, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8000/api/v1/listings", cretaelisting);
      navigate("/"); // Redirect to listing page
    } catch (error) {
      console.error("Error creating listing:", error);
    }
  };

  return (
    <div className="create">
      <h2>Create Your Listing</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter Your Title"
          value={cretaelisting.title}
          onChange={handleChange}
        /> <br /><br />
        <textarea
          name="description"
          placeholder="Enter Your Description"
          value={cretaelisting.description}
          onChange={handleChange}
        /> <br /><br />
        <input
          type="text"
          name="image"
          placeholder="Enter Image URL"
          value={cretaelisting.image}
          onChange={handleChange}
        /> <br /><br />
        <input
          type="number"
          name="price"
          placeholder="Enter Your Price"
          value={cretaelisting.price}
          onChange={handleChange}
        /> <br /><br />
        <input
          type="text"
          name="location"
          placeholder="Enter Your Location"
          value={cretaelisting.location}
          onChange={handleChange}
        /> <br /><br />
        <input
          type="text"
          name="country"
          placeholder="Enter Your Country"
          value={cretaelisting.country}
          onChange={handleChange}
        /> <br /><br />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default ListingCreate;
