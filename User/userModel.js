const mongoose = require("mongoose");

const User = mongoose.Schema({
  id: String,
  name: String,
  email: String,
  password: String,
  isAdmin: Boolean,
});

module.exports = mongoose.model("User", User);
