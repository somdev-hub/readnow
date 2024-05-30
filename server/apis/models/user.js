const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  name: String,
  header: String,
  description: String,
  profilePicture: String,
  backgroundPicture: String,
  tags: Array,
  followers: Array,
  following: Array,
  posts: Number,
  groups: Array,
  notifications: Array,
  publishers: Array,
  otherEmails: Array
});

const User = mongoose.model("User", userSchema);

module.exports = User;
