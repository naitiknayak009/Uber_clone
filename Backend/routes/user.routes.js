// Importing required modules
const express = require("express"); // Express framework for building web APIs
const router = express.Router(); // Express Router to define routes
const { body } = require("express-validator"); // `express-validator` for request validation
const userController = require("../controllers/user.controller"); // Controller to handle business logic for user routes

// Define the route for user registration
router.post(
  "/register", // Route path for registering a user
  [
    // Validation middleware provided by `express-validator`

    // Validate first name
    body("fullname.firstname") // Access the `firstname` property within `fullname`
      .isLength({ min: 3 }) // Ensure the first name is at least 3 characters long
      .withMessage("First name must be at least 3 characters long"), // Custom error message if validation fails

    // Validate last name (optional field)
    body("fullname.lastname") // Access the `lastname` property within `fullname`
      .optional() // Only validate if `lastname` is provided
      .isLength({ min: 3 }) // Ensure the last name is at least 3 characters long
      .withMessage("Last name must be at least 3 characters long"), // Custom error message

    // Validate email
    body("email") // Access the `email` property in the request body
      .isEmail() // Check if the value is a valid email
      .withMessage("Invalid email format"), // Custom error message if validation fails

    // Validate password
    body("password") // Access the `password` property in the request body
      .isLength({ min: 6 }) // Ensure the password is at least 6 characters long
      .withMessage("Password must be at least 6 characters long"), // Custom error message
  ],
  userController.registerUser // Controller function to handle the request after validation
);

// Export the router for use in the application
module.exports = router;
