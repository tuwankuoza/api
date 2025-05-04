const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  accountId: { type: String, unique: true, required: true },
  userName: { type: String, unique: true },
  password: String,
  lastLoginDateTime: Date,
  userId: { type: String, required: true },
});

accountSchema.index({ lastLoginDateTime: 1 });

module.exports = mongoose.model("Account", accountSchema);
