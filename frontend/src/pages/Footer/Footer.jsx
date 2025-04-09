import React from "react";

function Footer() {
  return (
    <>
      <footer className="bg-dark text-white pt-4 mt-2">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>Listings</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Beach Houses
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Mountain Cabins
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    City Apartments
                  </a>
                </li>
                <li>
                  <a href="#" className="text-white text-decoration-none">
                    Luxury Villas
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-md-4">
              <h5>About Wanderlust</h5>
              <p>
                Wanderlust is your gateway to dream stays. From cozy cottages to
                grand resorts, we list unique homes around the world.
              </p>
            </div>

            <div className="col-md-4">
              <h5>Follow Us</h5>
              <a href="#" className="text-white me-3">
                <i className="fab fa-facebook fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-instagram fa-lg"></i>
              </a>
              <a href="#" className="text-white me-3">
                <i className="fab fa-twitter fa-lg"></i>
              </a>
              <a href="#" className="text-white">
                <i className="fab fa-youtube fa-lg"></i>
              </a>
            </div>
          </div>

          <hr className="bg-light" />
          <div className="text-center pb-3">
            &copy; 2025 Wanderlust. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer;
