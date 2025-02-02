// Load environment variables from a .env file
const dotenv = require("dotenv");
dotenv.config(); // Makes the variables in .env file available via `process.env`

// Importing required modules
const express = require("express"); // Framework for building web APIs
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
const connectToDb = require("./db/db"); // Function to connect to the database
const userRoutes = require("./routes/user.routes"); // User-related API routes
const UserModel = require("./models/user.model");
const cookieParser = require('cookie-parser');
const captainRoutes = require("./routes/captain.routes"); // Captain-related API routes

// Initialize the Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS to allow requests from different origins
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(cookieParser());

// Connect to the database
connectToDb(); // Establishes a connection to the database

// API routes
app.use("/api/user", userRoutes); 
app.use("/api/captain", captainRoutes);
// All user-related routes are prefixed with `/api`, e.g., `/api/register`

// Default route
app.get("/", async (req, res) => {
  try {
    const users = await UserModel.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ 
      message: "Error fetching users", 
      error: error.message 
    });
  }
});


// Export the app instance
module.exports = app;
