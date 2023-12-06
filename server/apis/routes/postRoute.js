const express = require("express");
const router = express.Router();
const {
  addPostController,
  getFeedsController,
  likePostController
} = require("../controllers/postController");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/add-post", upload.single("image"), addPostController);
router.get("/get-feeds", getFeedsController);
router.post("/like-post", likePostController);

module.exports = router;
