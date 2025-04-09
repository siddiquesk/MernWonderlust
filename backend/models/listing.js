const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review");

// ================================
// Listing Schema Definition
// ================================
const listingSchema = new Schema({
  title: {
    type: String,
    required: true, // Title is mandatory
  },
  description: {
    type: String,
    required: true, // Description is mandatory
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
    
    // If user passes an empty string, set the default image URL
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D"
        : v,
  },
  price: {
    type: Number, // Optional price field
  },
  location: {
    type: String,
    required: true, // Location is mandatory
  },
  country: {
    type: String,
    required: true, // Country is mandatory
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review", // References to Review documents
    },
  ],
});

// ==============================================
// Mongoose Middleware (post hook)
// Automatically delete all reviews of a listing
// after the listing itself is deleted
// ==============================================
listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    // Delete all reviews whose IDs are in the listing's reviews array
    await Review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

// Creating and exporting the Listing model
const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;

