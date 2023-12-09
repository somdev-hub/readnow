const Bookmarks = require("../models/bookmarks");
const axios = require("axios");
require("dotenv").config();
const { Types } = require("mongoose");

const addBookmarkController = async (req, res) => {
  const { email, type, item } = req.body;
  try {
    let bookmarks = await Bookmarks.findOne({ user: email });
    const newBookmark = {
      _id: new Types.ObjectId(),
      type,
      item
    };
    if (!bookmarks) {
      bookmarks = new Bookmarks({
        user: email,
        bookmarks: [newBookmark]
      });
    } else {
      bookmarks.bookmarks.push(newBookmark);
    }
    await bookmarks.save();
    res.status(200).json({
      message: "Bookmark added successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const getBookmarkController = async (req, res) => {
  const { email } = req.params;
  try {
    const bookmarks = await Bookmarks.findOne({ user: email });
    if (!bookmarks) {
      return res.status(200).json({
        bookmarks: [],
        message: "No bookmarks found"
      });
    }

    const postIds = bookmarks.bookmarks
      .filter((bookmark) => bookmark.type === "post")
      .map((bookmark) => bookmark.item);

    const response = await axios.get(
      `${process.env.STRAPI_API}/api/posts?populate=*&id_in=${postIds.join(
        ","
      )}`
    );
    const posts = response.data.data;

    const bookmarksPosts = bookmarks.bookmarks.map((bookmark) => {
      if (bookmark.type === "post") {
        const post = posts.find((post) => post.id === bookmark.item);
        return {
          type: bookmark.type,
          _id: bookmark._id,
          item: {
            ...post.attributes,
            id: post.id,
            image: `${process.env.STRAPI_API}${post.attributes.image.data.attributes?.url}`
          }
        };
      } else {
        return bookmark;
      }
    });

    res.status(200).json({
      bookmarks: bookmarksPosts.reverse()
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

const deleteBookmarkController = async (req, res) => {
  const { email, bookmarkIds, type } = req.params;

  try {
    const userBookmarks = await Bookmarks.findOne({ user: email });

    if (!userBookmarks) {
      return res.status(200).json({ message: "No bookmarks found" });
    }

    userBookmarks.bookmarks = userBookmarks.bookmarks.filter((bookmark) => {
      if (type === "post") {
        return bookmark.item.id != bookmarkIds;
      } else {
        return !bookmarkIds.includes(bookmark._id.toString());
      }
    });

    await userBookmarks.save();

    res.status(200).json({ message: "Bookmark deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addBookmarkController,
  getBookmarkController,
  deleteBookmarkController
};
