const express = require("express");
const router = express.Router();
const {
  addPostController,
  getFeedsController,
  likePostController,
  commentPostController,
  deletePostController
} = require("../controllers/postController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/add-post", upload.single("image"), addPostController);
router.get("/get-feeds", getFeedsController);
router.post("/like-post", likePostController);
router.post("/comment-post", commentPostController);
router.delete("/delete-post/:postId", deletePostController);

module.exports = router;
