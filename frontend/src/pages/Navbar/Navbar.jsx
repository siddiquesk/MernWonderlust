import React, { useState, useRef, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // 👈 auth context import

function Navbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const { user } = useAuth(); // 👈 user from context

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container-fluid px-4">
        {/* === Left Section (Brand Logo) === */}
        <div className="navbar-left">
          <Link to="/" className="navbar-brand fw-bold fs-3 text-danger">
            <i className="fa-solid fa-compass"></i> Airbnb
          </Link>
        </div>

        {/* === Center Section (Search Bar) === */}
        <div className="search-bar d-none d-md-flex align-items-center">
          <span className="px-3 fw-semibold">Anywhere</span>
          <span className="px-3 border-start border-end">Any week</span>
          <span className="px-3 text-muted">Add guests</span>
        </div>

        {/* === Right Section (Menu + Dropdown) === */}
        <div
          className="navbar-right d-flex align-items-center gap-3 position-relative"
          ref={dropdownRef}>
          <span className="d-none d-md-inline fw-semibold">Become a Host</span>

          {/* Hamburger & User Icon */}
          <div
            className="menu-box d-flex align-items-center justify-content-between px-3 py-2 rounded-pill"
            onClick={toggleDropdown}
            style={{ cursor: "pointer" }}>
            <i className="fa-solid fa-bars me-2"></i>
            <i className="fa-solid fa-user"></i>
          </div>

          {/* === Dropdown Menu === */}
          {showDropdown && (
            <div className="dropdown-menu-custom position-absolute end-0 mt-2 p-3 shadow rounded-3 bg-white">
              {!user ? (
                <>
                  <Link
                    to={"/signup"}
                    className="dropdown-item-custom mb-2 p-2">
                    Sign up
                  </Link>
                  <Link to={"/login"} className="dropdown-item-custom mb-2 p-2">
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/listings/new"
                    className="dropdown-item-custom mb-2 p-2">
                    Create Listing
                  </Link>
                  <hr className="my-2" />
                  <Link to={"/logout"} className="dropdown-item-custom p-2">
                    Logout
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
