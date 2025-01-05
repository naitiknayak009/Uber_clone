const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const CaptainSchema = new Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
    },
    plate: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
   
  },
  location: {
     lat: {
       type: Number,
       required: false,
     },
     lng: {
       type: Number,
       required: false,
     },
   },
});
CaptainSchema.methods.generateAuthToken = function () {
  // The `this` keyword refers to the current user instance
  const token = jwt.sign(
    { _id: this._id }, // Payload: user ID
    process.env.JWT_SECRET, // Secret key from environment variables
    { expiresIn: "24h" } // Token expires in 1 hour
  );
  return token; // Return the generated token
};

CaptainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
CaptainSchema.statics.hashPassword = async function (password) {
     return await bcrypt.hash(password, 10);
}
const CaptainModel = mongoose.model("Captain", CaptainSchema);

module.exports = CaptainModel;
