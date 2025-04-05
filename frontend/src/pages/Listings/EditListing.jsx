import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function EditListing() {
  const [Editlisting, setEditlisting] = useState({
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
        setEditlisting(response.data);
      } catch (error) {
        console.error("Error fetching listing:", error);
      }
    };
    fetchListing();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:8000/api/v1/listings/${id}`,
        Editlisting
      );
      navigate("/");
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };
  const handleChange = (e) => {
    setEditlisting({ ...Editlisting, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="editlisting">
        {" "}
        <br />
        <h2>Edit your Listings</h2> <br /> <br />
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter Your Title"
            value={Editlisting.title}
            onChange={handleChange}
          />{" "}
          <br />
          <br />
          <textarea
            name="description"
            placeholder="Enter Your Description"
            value={Editlisting.description}
            onChange={handleChange}
          />{" "}
          <br />
          <br />
          <input
            type="text"
            name="image"
            placeholder="Enter Image URL"
            value={Editlisting.image}
            onChange={handleChange}
          />{" "}
          <br />
          <br />
          <input
            type="number"
            name="price"
            placeholder="Enter Your Price"
            value={Editlisting.price}
            onChange={handleChange}
          />{" "}
          <br />
          <br />
          <input
            type="text"
            name="location"
            placeholder="Enter Your Location"
            value={Editlisting.location}
            onChange={handleChange}
          />{" "}
          <br />
          <br />
          <input
            type="text"
            name="country"
            placeholder="Enter Your Country"
            value={Editlisting.country}
            onChange={handleChange}
          />{" "}
          <br />
          <br />
          <button type="submit">Edit Listings</button>
        </form>
      </div>
    </>
  );
}

export default EditListing;
