const http = require("http");
const app = require("./app");

// Use environment variable for port or default to 3000
const port = process.env.PORT || 3000;

// Create the HTTP server
const server = http.createServer(app);

// Start the server and handle errors
server.listen(port, () => {
  console.log(`✅ Server is running on http://localhost:${port}`);
});

server.on("error", (err) => {
  console.error("❌ Server encountered an error:", err.message);
  process.exit(1); // Exit process on critical errors
});
