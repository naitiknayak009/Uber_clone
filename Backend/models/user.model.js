const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First Name should be at least three characters long"],
    },
    lastname: {
      type: String,
      minlength: [3, "Last Name should be at least three characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email should be at least five characters long"],
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: [8, "Password should be at least eight characters long"],
  },
  socketId: {
    type: String,
  },
});

// Generate an authentication token for the user
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

// Compare provided password with hashed password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Hash a password before storing it
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
