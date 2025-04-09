const Review = require('../models/review');
const Listing = require('../models/listing');

// =======================
// POST: Add a new review
// =======================
const reviewPost = async (req, res) => {
  try {
    // Find the listing to which the review will be added
    const listing = await Listing.findById(req.params.id);

    // Create a new review using request body
    const newReview = new Review(req.body);

    // Push the new review's reference to listing.reviews array
    listing.reviews.push(newReview);

    // Save the review first
    await newReview.save();

    // Then save the updated listing with the new review reference
    const updatedListing = await listing.save();

    // Return the updated listing as response
    res.status(200).json(updatedListing);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ========================
// GET: Get all reviews of a listing
// ========================
const getReviews = async (req, res) => {
  try {
    // Find the listing and populate the associated reviews
    const listing = await Listing.findById(req.params.id).populate('reviews');

    // If listing not found, return 404
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Return only the reviews from the listing
    res.status(200).json({ reviews: listing.reviews });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// =========================
// DELETE: Delete a review
// =========================
const deleteReviews = async (req, res) => {
  try {
    const { id, reviewId } = req.params;

    // Remove the review reference from the listing's reviews array
    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId }
    });

    // Delete the review document from the Review collection
    await Review.findByIdAndDelete(reviewId);

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  reviewPost,
  getReviews,
  deleteReviews
};
