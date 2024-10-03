// backend/server.js
const express = require('express');
const connectDB = require('./config/db'); 
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Ensure this points to the correct route file

const app = express();

// Connect to MongoDB
connectDB();

// Middleware to allow cross-origin requests (CORS)
app.use(cors({ origin: 'http://localhost:3000' })); // Allow requests from frontend

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes); // Use the auth routes for authentication

// Set up the server to listen on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
