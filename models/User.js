const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true, required: true },
  fullName: String,
  accountNumber: { type: String, unique: true },
  emailAddress: String,
  registrationNumber: { type: String, unique: true },
});

module.exports = mongoose.model("User", userSchema);
