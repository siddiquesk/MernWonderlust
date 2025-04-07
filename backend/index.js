const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Import database connection and routes
const DbConnection = require('./database/db');
const listingRoutes = require('./routes/listingRouts');
// Set port from .env or default to 8080
const PORT = process.env.PORT || 8080;
// Enable CORS for frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true, // Allow cookies/headers
}));

// Parse JSON and URL-encoded data from requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', listingRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  const { status = 500, message = "Something went wrong!" } = err;
  res.status(status).json({ message });
});

app.listen(PORT, () => {
  DbConnection(); // Connect to MongoDB
  console.log(`✅ Server is running on port ${PORT}`);
});


