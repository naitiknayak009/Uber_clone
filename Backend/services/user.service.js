// Importing the User model
const userModel = require("../models/user.model"); // This model interacts with the database to manage user data

// Function to create a new user
module.exports.createUser = async ({
  Firstname, // First name of the user
  Lastname,  // Last name of the user
  email,     // Email address of the user
  password,  // Password for the user account
}) => {
  // Step 1: Validate the input
  if (!Firstname || !Lastname || !email || !password) {
    // Check if any required field is missing
    throw new Error("Please fill all the required fields");
    // If a required field is missing, throw an error
    // The error can be caught by the calling function and handled appropriately
  }

  // Step 2: Create the user in the database
  const user = await userModel.create({
    // The `create` method is provided by Mongoose to add a new document to the database
    fullname: { 
      firstname: Firstname, // Map the first name to the `firstname` field
      lastname: Lastname,   // Map the last name to the `lastname` field
    },
    email,     // Store the user's email
    password,  // Store the user's hashed password
  });

  // Step 3: Return the created user object
  return user;
};
