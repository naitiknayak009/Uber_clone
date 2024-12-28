// Load environment variables from a .env file
const dotenv = require("dotenv");
dotenv.config(); // Makes the variables in .env file available via `process.env`

// Importing required modules
const express = require("express"); // Framework for building web APIs
const cors = require("cors"); // Middleware to enable Cross-Origin Resource Sharing
const connectToDb = require("./db/db"); // Function to connect to the database
const userRoutes = require("./routes/user.routes"); // User-related API routes

// Initialize the Express application
const app = express();

// Middleware setup
app.use(cors()); // Enable CORS to allow requests from different origins
app.use(express.json()); // Parse incoming JSON requests
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data

// Connect to the database
connectToDb(); // Establishes a connection to the database

// API routes
app.use("/api", userRoutes); 
// All user-related routes are prefixed with `/api`, e.g., `/api/register`

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!"); // Responds with a simple message for the root route
});

// Export the app instance
module.exports = app;
