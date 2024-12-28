// Importing required libraries
const mongoose = require("mongoose"); // Mongoose is used for MongoDB object modeling
const bcrypt = require("bcrypt"); // bcrypt is used for hashing passwords
const jwt = require("jsonwebtoken"); // jwt is used for generating authentication tokens

// Defining the schema for the User collection in MongoDB
const userSchema = new mongoose.Schema({
  // Full name is stored as a nested object with firstname and lastname
  fullname: {
    firstname: {
      type: String, // Firstname must be a string
      required: true, // It is mandatory
      minlength: [3, "First Name should be at least three characters long"], // Minimum length validation
    },
    lastname: {
      type: String, // Lastname must be a string
      minlength: [3, "Last Name should be at least three characters long"], // Minimum length validation
    },
  },
  // Email field
  email: {
    type: String, // Email must be a string
    required: true, // It is mandatory
    unique: true, // The email should be unique in the database
    minlength: [5, "Email should be at least five characters long"], // Minimum length validation
  },
  // Password field
  password: {
    type: String, // Password must be a string
    required: true, // It is mandatory
    select: false, // This field will not be selected by default in queries for security
    minlength: [8, "Password should be at least eight characters long"], // Minimum length validation
  },
  // Optional field for socket ID (useful for real-time applications like chats)
  socketId: {
    type: String, // Socket ID must be a string
  },
});

// Instance method to generate an authentication token for a user
userSchema.methods.generateAuthToken = function () {
  // The `this` keyword refers to the current user instance
  const token = jwt.sign(
    { _id: this._id }, // Payload: user ID
    process.env.JWT_SECRET, // Secret key from environment variables
    { expiresIn: "1h" } // Token expires in 1 hour
  );
  return token; // Return the generated token
};

// Instance method to compare the provided password with the stored hashed password
userSchema.methods.comparePassword = async function (password) {
  // `this.password` contains the hashed password of the user
  return await bcrypt.compare(password, this.password); // bcrypt.compare checks if passwords match
};

// Static method to hash a password (used before saving a new user)
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10); // Hash the password with a salt factor of 10
};

// Creating the User model using the schema
const UserModel = mongoose.model("User", userSchema); // `User` is the name of the model/collection

// Exporting the UserModel for use in other parts of the application
module.exports = UserModel;
