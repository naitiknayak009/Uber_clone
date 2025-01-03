// Importing necessary modules
const UserModel = require("../models/user.model");
const userModel = require("../models/user.model"); // Module to interact with the user data in the database
const { use } = require("../routes/user.routes");
const userService = require("../services/user.service"); // Service layer to handle business logic for user operations
const { validationResult } = require("express-validator"); // Middleware to validate the request data

// Function to handle user registration
module.exports.registerUser = async (req, res, next) => {
  try {
    // Step 1: Validate the request body using the validation rules
    const errors = validationResult(req); // validationResult checks for validation errors in the request
    if (!errors.isEmpty()) {
      // If validation errors exist, respond with a 400 Bad Request and the list of errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Step 2: Extract required data from the request body
    const { fullname, email, password } = req.body;

    // Step 3: Hash the user's password for secure storage
    const hashPassword = await userModel.hashPassword(password);
    // The hashPassword method is typically defined in the user model to securely hash passwords before saving them

    // Step 4: Create a new user object
    const user = await userService.createUser({
      Firstname: fullname.firstname, // Extracting the first name from the fullname object
      Lastname: fullname.lastname, // Extracting the last name from the fullname object
      email, // Email from the request body
      password: hashPassword, // Using the hashed password
    });
    // The createUser method in the userService handles the logic to save the user in the database

    // Step 5: Generate an authentication token for the newly registered user
    const token = user.generateAuthToken();
    // generateAuthToken is assumed to be a method on the user object that creates a token (e.g., JWT) for authentication

    // Step 6: Respond with the token and the newly created user data
    res.status(201).json({ token, user }); // 201 indicates resource creation was successful
  } catch (err) {
    // Error handling: log the error and respond with a 500 Internal Server Error
    console.error("Error during registration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports.loginUser = async (req, res, next) => {
 
    // Step 1: Validate the request body using the validation rules
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Step 2: Extract required data from the request body
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email }).select("+password");
    if(!user){
      return res.status(401).json({error: "User not found"});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
      return res.status(401).json({error: "Invalid password"});
    }
    const token = user.generateAuthToken();
    res.status(200).json({token, user});
  }
module.exports.getUserProfile = async (req, res, next) => {
  try {
    // Step 1: Extract the user ID from the request object (added by the authentication middleware)
    const userId = req.user._id;

    // Step 2: Fetch the user profile data using the user ID
    const user = await userService.getUserById(userId);
    // The getUserById method in the userService fetches the user data based on the ID

    // Step 3: Respond with the user profile data
    res.status(200).json(user); // 200 indicates success
  } catch (err) {
    // Error handling: log the error and respond with a 500 Internal Server Error
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Internal server error" });
  }
}