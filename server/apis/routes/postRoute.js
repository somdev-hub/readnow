/**
 * @file postRoute.js
 * @description Post Route for handling posts.
 * @module Post Route
 *
 * @requires express Express web framework for Node.js
 * @requires multer Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
 * @requires addPostController Add Post Controller for handling adding posts.
 * @requires getFeedsController Get Feeds Controller for handling getting feeds.
 * @requires likePostController Like Post Controller for handling liking posts.
 * @requires commentPostController Comment Post Controller for handling commenting posts.
 * @requires deletePostController Delete Post Controller for handling deleting posts.
 *
 * @routes {POST} /add-post Route for adding post.
 * @routes {GET} /get-feeds Route for getting feeds.
 * @routes {POST} /like-post Route for liking post.
 * @routes {POST} /comment-post Route for commenting post.
 * @routes {DELETE} /delete-post/:postId Route for deleting post.
 *
 */

const express = require("express");
const multer = require("multer");
const {
  addPostController,
  getFeedsController,
  likePostController,
  commentPostController,
  deletePostController
} = require("../controllers/postController");

const router = express.Router();
// multer is used for uploading files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// -------------------------- Routes -------------------------- //

// hit this route to add post
router.post("/add-post", upload.single("image"), addPostController);
// hit this route to get feeds
router.get("/get-feeds", getFeedsController);
// hit this route to like post
router.post("/like-post", likePostController);
// hit this route to comment post
router.post("/comment-post", commentPostController);
// hit this route to delete post
router.delete("/delete-post/:postId", deletePostController);

module.exports = router;
