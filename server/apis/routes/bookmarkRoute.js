const express = require("express");
const {
  addBookmarkController,
  getBookmarkController
} = require("../controllers/bookmarkController");

const router = express.Router();

router.post("/add-bookmark", addBookmarkController);
router.post("/get-bookmarks", getBookmarkController);

module.exports = router;
