import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("https://sufiyan-airbnb-vella.onrender.com/api/v1/signup", register, {
        withCredentials: true,
      });

      setUser(res.data.user); // Update auth context
      toast.success("Signup successful!", {
        duration: 2000,
        position: "top-center",
        style: {
          backgroundColor: "#8B0000",
          color: "#fff",
          fontWeight: "bold",
          fontSize: "16px",
          borderRadius: "10px",
          padding: "15px",
        },
      });

      setTimeout(() => {
        navigate("/");
      }, 500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
      console.error(err);
    }
  };

  return (
    <div className="container mt-3 p-2">
      <h2 className="text-muted mt-2 mb-3 offset-4">Signup In Wonderlust</h2>
      <div className="row">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-control"
              placeholder="Enter Your Name"
              value={register.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className="form-control"
              placeholder="Enter your email"
              value={register.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Enter Password"
              value={register.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-danger mb-2">Signup</button>
        </form>
      </div>
    </div>
  );
}

export default Signup;

