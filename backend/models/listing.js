const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D",
    set: (v) => v === "" ? "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG91c2UlMjBpbWFnZXN8ZW58MHx8MHx8fDA%3D" : v,
  },
  price: {
    type: Number,
  },
  location: {
    type: String,         // ✅ fixed
    required: true,       // ✅ fixed
  },
  country: {
    type: String,
    required: true,
  }
});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;
