// Importing required modules
const http = require("http"); // Node.js built-in module for creating an HTTP server
const app = require("./app"); // Import the Express application instance

// Use environment variable for port or default to 3000
const port = process.env.PORT || 3000;
// `process.env.PORT` allows the port to be set dynamically (e.g., in production environments like Heroku)

// Create the HTTP server
const server = http.createServer(app); 
// Pass the Express app (`app`) to the server to handle incoming requests

// Start the server and log a success message once it's running
server.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});

// Handle server errors
server.on("error", (err) => {
  console.error("❌ Server encountered an error:", err.message);
  
  // Critical error, so exit the process with a failure code (1)
  process.exit(1); 
});
