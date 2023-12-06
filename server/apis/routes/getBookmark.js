const express = require("express");
const Bookmarks = require("../models/bookmarks");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  // console.log(req.body);
  try {
    const bookmarks = await Bookmarks.findOne({ user: email });
    if (bookmarks) {
      res.status(200).json({
        bookmarks: bookmarks.bookmarks,

      });
    } else {
      res.status(200).json({
        bookmarks: [],
        message: "No bookmarks found"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error"
    });
  }
});

module.exports = router;
