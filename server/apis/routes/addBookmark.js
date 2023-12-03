const express = require("express");
const Bookmarks = require("../models/bookmarks");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email, type, item } = req.body;
  console.log(req.body);
  try {
    const bookmarks = await Bookmarks.findOne({ user: email });
    switch (type) {
      case "news":
        const newBookmark = {
          type,
          item
        };
        if (bookmarks) {
          console.log(bookmarks);
          bookmarks.bookmarks.push(newBookmark);
          bookmarks.save();
        } else {
          const newBookmarks = new Bookmarks({
            user: email,
            bookmarks: [newBookmark]
          });
          newBookmarks.save();
          res.status(200).json({
            message: "Bookmark added successfully"
          });
        }
        break;

      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error"
    });
  }
});

module.exports = router;
