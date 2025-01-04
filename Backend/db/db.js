// Importing the Mongoose library
const mongoose = require("mongoose"); // Mongoose is an ODM (Object Data Modeling) library for MongoDB

// Function to establish a connection to the MongoDB database
function connectToDb() {
  // Use Mongoose's connect method to connect to the database
  mongoose
    .connect(process.env.DB_CONNECT, {
      
    })
    .then(() => {
      // If the connection is successful, log a success message
      console.log("✅ Successfully connected to the database");
    })
    .catch((err) => {
      // If the connection fails, log the error message
      console.error("❌ Error connecting to the database:", err);

      // Exit the process to prevent the application from running without a database
      process.exit(1);
    });
}

// Export the function so it can be used in other parts of the application
module.exports = connectToDb;
