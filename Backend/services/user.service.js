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
  }

  // Step 2: Create the user in the database
  const user = await userModel.create({
    fullname: { 
      firstname: Firstname,
      lastname: Lastname,
    },
    email,
    password,
  });

  // Step 3: Return the created user object
  return user;
};

// Function to get a user by ID
module.exports.getUserById = async (userId) => {
  // Step 1: Validate the user ID
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Step 2: Fetch the user from the database using the user ID
  const user = await userModel.findById(userId);
  
  // Step 3: Check if the user exists
  if (!user) {
    throw new Error("User not found");
  }

  // Step 4: Return the user object
  return user;
};
