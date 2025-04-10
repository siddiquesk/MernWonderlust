const Review = require('../models/review');
const Listing = require('../models/listing');

// =======================
// POST: Add a new review
// =======================
const reviewPost = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    const newReview = new Review(req.body);

    listing.reviews.push(newReview);
    await newReview.save();
    const updatedListing = await listing.save();

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
    const listing = await Listing.findById(req.params.id).populate('reviews');

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

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

    await Listing.findByIdAndUpdate(id, {
      $pull: { reviews: reviewId }
    });

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
