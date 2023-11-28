const mongoose = require("mongoose");

const Post = mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  image: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "photo"
    // required: true
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  postedBy: {
    // type: mongoose.Schema.Types.ObjectId,
    // ref: "User"
    type: String,
  },
  likes: Number,
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User"
  },
  comments: {
    type: [String],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
});

const PostModel = mongoose.model("Post", Post);

module.exports = PostModel;
