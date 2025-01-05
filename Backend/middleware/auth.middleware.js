const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BlacklistToken = require("../models/blacklistToken.model");

module.exports.authUser = async (req, res, next) => {
  let token = null;
  
  if (req.cookies.token) {
    token = req.cookies.token;
  }
  // Check for token in Authorization header
  else if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];

  }
  const isBlacklisted = await BlacklistToken.findOne({ token });
  if(isBlacklisted){
     return res.status(401).json({ error: "Unauthorized access" });
  }
  if (!token) {
    return res.status(401).json({ error: "Unauthorized access" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized access" });
    }
    req.user = user;
    return next();
  } catch (err) {
    console.error("Error during authentication:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
