const express = require("express");
const Bookmarks = require("../models/bookmarks");
const router = express.Router();

router.post("/", async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  try {
    const bookmarks = await Bookmarks.findOne({ user: email });
    res.status(200).json({
      bookmarks: bookmarks.bookmarks
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "server error"
    });
  }
});

module.exports = router;
