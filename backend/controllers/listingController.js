const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");

// =====================================
// GET: Fetch all listings
// Route: GET /api/listings
// =====================================
const getListings = async (req, res, next) => {
  try {
    const allListings = await Listing.find({});
    if (!allListings) {
      return res.status(404).json({ message: "No listings found" });
    }
    res.status(200).json(allListings);
  } catch (err) {
    next(err); // Pass error to error-handling middleware
  }
};

// =====================================
// GET: Fetch single listing by ID
// Route: GET /api/listings/:id
// =====================================
const showListings = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Fetch listing by ID and populate reviews
    const listing = await Listing.findById(id).populate("reviews");

    if (!listing) {
      return next(new ExpressError(404, "Listing not found"));
    }

    res.status(200).json(listing);
  } catch (err) {
    next(err); // Send error to error handler
  }
};

// =====================================
// POST: Create a new listing
// Route: POST /api/listings
// =====================================
const createListings = async (req, res) => {
  try {
    const { image, title, description, price, country, location } = req.body;

    // Check for duplicate listing
    const duplicateListing = await Listing.findOne({
      image,
      title,
      description,
      price,
      country,
      location,
    });

    if (duplicateListing) {
      return res
        .status(200)
        .json({ message: "This listing is already created by another user" });
    }

    // Create a new listing
    const newListing = new Listing({
      image,
      title,
      description,
      price,
      country,
      location,
    });

    // Save the listing to DB
    const savedListing = await newListing.save();
     console.log(savedListing);
    if (!savedListing) {
      return res.status(400).json({ message: "Invalid data" });
    }

    res.status(201).json(savedListing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =====================================
// PUT: Edit listing by ID
// Route: PUT /api/listings/:id
// =====================================
const EditListings = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Update listing and return the new updated object
    const updateListing = await Listing.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updateListing) {
      return next(new ExpressError(404, "Listing not updated"));
    }

    res.status(200).json(updateListing);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =====================================
// DELETE: Delete listing by ID
// Route: DELETE /api/listings/:id
// =====================================
const deleteListing = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Delete listing by ID
    const deleted = await Listing.findByIdAndDelete(id);

    if (!deleted) {
      return next(new ExpressError(404, "Listing not found"));
    }

    res.status(200).json({ message: "Listing deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Exporting all controller functions
module.exports = {
  getListings,
  showListings,
  createListings,
  EditListings,
  deleteListing,
};
