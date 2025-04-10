import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const [user, setUserInput] = useState({
    username: "",
    password: "",
  });

  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInput({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8000/api/v1/login", user, {
        withCredentials: true,
      });

      setUser(res.data.user); // Update auth context
      toast.success("Login successful!", {
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
      toast.error(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  return (
    <div className="container mt-3 p-2">
      <h2 className="text-muted mt-2 mb-3 offset-4">Login In Wonderlust</h2>
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
              value={user.username}
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
              placeholder="Enter Your Password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-success mb-2">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;

