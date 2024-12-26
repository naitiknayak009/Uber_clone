const userModel = require("../models/user.model");

module.exports.createUser = async ({
  Firstname,
  Lastname,
  email,
  password,
}) => {
  if (!Firstname || !Lastname || !email || !password) {
    throw new Error("Please fill all the required fields");
  }

  // Create the user
  const user = await userModel.create({
    fullname: { firstname: Firstname, lastname: Lastname },
    email,
    password,
  });

  return user; // Return the created user
};
