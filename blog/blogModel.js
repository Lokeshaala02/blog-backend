const mongoose = require("mongoose");

const Blog = mongoose.Schema({
  id: String,
  title: String,
  discription: String,
  date: String,
});

module.exports = mongoose.model("Blog", Blog);
