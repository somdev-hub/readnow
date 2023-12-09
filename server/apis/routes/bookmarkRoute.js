const express = require("express");
const {
  addBookmarkController,
  getBookmarkController,
  deleteBookmarkController
} = require("../controllers/bookmarkController");

const router = express.Router();

router.post("/add-bookmark", addBookmarkController);
router.get("/get-bookmarks/:email", getBookmarkController);
router.delete("/delete-bookmark/:email/:bookmarkIds/:type", deleteBookmarkController);

module.exports = router;
