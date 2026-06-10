const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  imageUrl: String,
  source: String,
  publishedAt: Date,
  url: String
});

module.exports = mongoose.model("News", newsSchema);