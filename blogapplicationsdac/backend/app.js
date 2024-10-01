// Import necessary dependencies
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Import routes and DB connection logic
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes')
const connectDB = require('./config/db');

// Initialize the express application
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Routes
app.use('/api/blogs', blogRoutes); // Use blog routes
app.use('/api/auth', authRoutes);// Use this for authentication

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
