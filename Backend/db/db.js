const mongoose = require("mongoose");

function connectToDb() {
  mongoose
    .connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("✅ Successfully connected to the database");
    })
    .catch((err) => {
      console.error("❌ Error connecting to the database:", err);
      process.exit(1); // Exit the process if DB connection fails
    });
}

module.exports = connectToDb;
