const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const connectToDb = require("./db/db");
const userRoutes = require("./routes/user.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to the database
connectToDb();

// API routes
app.use("/api", userRoutes); // Register user routes under /api

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = app;
