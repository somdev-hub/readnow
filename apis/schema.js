const mongoose = require("mongoose");

const bookmarksSchema = new mongoose.Schema({
  user: String,
  bookmarks: Array
});

const Bookmarks = mongoose.model("Bookmarks", bookmarksSchema);

module.exports = Bookmarks;
