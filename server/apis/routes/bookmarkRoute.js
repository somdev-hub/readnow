/**
 * @file bookmarkRoute.js
 * @description Bookmark Route for handling bookmarks.
 * @module Bookmark Route
 *
 * @requires express Express web framework for Node.js
 * @requires addBookmarkController Add Bookmark Controller for handling adding bookmarks.
 * @requires getBookmarkController Get Bookmark Controller for handling getting bookmarks.
 * @requires deleteBookmarkController Delete Bookmark Controller for handling deleting bookmarks.
 *
 * @routes {POST} /add-bookmark Route for adding bookmark.
 * @routes {GET} /get-bookmarks/:email Route for getting bookmarks.
 * @routes {DELETE} /delete-bookmark/:email/:bookmarkIds/:type Route for deleting bookmarks.
 * 
 */

const express = require("express");
const {
  addBookmarkController,
  getBookmarkController,
  deleteBookmarkController
} = require("../controllers/bookmarkController");

const router = express.Router();

// -------------------------- Routes -------------------------- //

// hit this route to add bookmark
router.post("/add-bookmark", addBookmarkController);
// hit this route to get bookmarks
router.get("/get-bookmarks/:email", getBookmarkController);
// hit this route to delete bookmarks
router.delete(
  "/delete-bookmark/:email/:bookmarkIds/:type",
  deleteBookmarkController
);

module.exports = router;
