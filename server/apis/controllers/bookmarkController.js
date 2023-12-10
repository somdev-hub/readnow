/**
 * @file bookmarkController.js
 * @description Bookmark Controller for handling bookmarks.
 * @module Bookmark Controller
 *
 * @requires Bookmarks Bookmarks model for database.
 * @requires axios Axios for handling requests.
 * @requires dotenv Dotenv for handling environment variables.
 * @requires Types Types for handling mongoose types.
 *
 * @exports addBookmarkController
 * @exports getBookmarkController
 * @exports deleteBookmarkController
 *
 */

const Bookmarks = require("../models/bookmarks");
const axios = require("axios");
require("dotenv").config();
const { Types } = require("mongoose");

/**
 * @function addBookmarkController
 * @description Controller for adding bookmark.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} req.body - Request body.
 * @param {string} req.body.email - User's email.
 * @param {string} req.body.type - Type of bookmark.
 * @param {string} req.body.item - Item of bookmark.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object with status and message.
 *
 * @example
 * // POST /add-bookmark
 * // Request body: { "email": "user@example", "type": "post", "item": "post_id" }
 * // Returns: { "status": 200, "message": "Bookmark added successfully" }
 *
 * @throws {500} If there is a server error.
 * @throws {200} If the bookmark is added successfully.
 */
const addBookmarkController = async (req, res) => {
  const { email, type, item } = req.body;
  try {
    // check if the bookmark already exists
    let bookmarks = await Bookmarks.findOne({ user: email });
    // if the bookmark does not exist, create a new bookmark
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
    }
    // if the bookmark exists, push the new bookmark to the existing bookmarks
    else {
      bookmarks.bookmarks.push(newBookmark);
    }
    await bookmarks.save();
    // return success message
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

/**
 * @function getBookmarkController
 * @description Controller for getting bookmarks.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.email - User's email.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object with status, message and bookmarks.
 *
 * @example
 * // GET /get-bookmarks/:email
 * // Request params: { "email": "user@example" }
 * // Returns: { "status": 200, "message": "No bookmarks found" }
 *
 * @throws {500} If there is a server error.
 * @throws {200} If the bookmarks are found.
 */

const getBookmarkController = async (req, res) => {
  const { email } = req.params;
  try {
    // get the bookmarks of the user
    const bookmarks = await Bookmarks.findOne({ user: email });
    // if the bookmarks do not exist, return empty bookmarks
    if (!bookmarks) {
      return res.status(200).json({
        bookmarks: [],
        message: "No bookmarks found"
      });
    }

    // if the bookmarks exist, get the postsIds from the bookmarks
    const postIds = bookmarks.bookmarks //postIds is an array of postIds
      .filter((bookmark) => bookmark.type === "post")
      .map((bookmark) => bookmark.item);

    // get the posts from the postIds and populate them
    // this api call is made to the strapi api to fetch the posts from the postIds
    // {populate=*} is used to populate the posts with the user data
    // {id_in} is used to get the posts with the postIds
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/posts?populate=*&id_in=${postIds.join(
        ","
      )}`
    );

    const posts = response.data.data;
    console.log(posts);

    // map the posts to the bookmarks and return the bookmarks
    const bookmarksPosts = bookmarks.bookmarks.map((bookmark) => {
      // if the bookmark is a post, get the post from the posts array
      if (bookmark.type === "post") {
        const post = posts.find((post) => post.id === bookmark.item);
        // return the bookmark as a object
        /**
         * @typedef {Object} Bookmark
         * @property {string} type - Type of bookmark.
         * @property {string} _id - Id of the bookmark.
         * @property {Object} item - Item of bookmark.
         */
        return {
          type: bookmark.type,
          _id: bookmark._id,
          item: {
            ...post.attributes,
            id: post.id,
            image: `${process.env.STRAPI_API}${post.attributes.image.data.attributes?.url}`
          }
        };
      }
      // if the bookmark is not a post, return the bookmark
      else {
        return bookmark;
      }
    });

    res.status(200).json({
      // reverse the bookmarks to get the latest bookmarks first
      bookmarks: bookmarksPosts.reverse()
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

/**
 * @function deleteBookmarkController
 * @description Controller for deleting bookmark.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.email - User's email.
 * @param {string} req.params.bookmarkIds - Bookmark's ids.
 * @param {string} req.params.type - Type of bookmark.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object with status and message.
 * 
 * @example
 * // DELETE /delete-bookmark/:email/:bookmarkIds/:type
 * // Request params: { "email": "user@example", "bookmarkIds": "bookmark_id", "type": "post" }
 * // Returns: { "status": 200, "message": "Bookmark deleted successfully" }
 * 
 * @throws {500} If there is a server error.
 * @throws {200} If the bookmark is deleted successfully.
 * 
 */

const deleteBookmarkController = async (req, res) => {
  const { email, bookmarkIds, type } = req.params;

  try {
    // get the bookmarks of the user
    const userBookmarks = await Bookmarks.findOne({ user: email });
    // if the bookmarks do not exist, return no bookmarks found
    if (!userBookmarks) {
      return res.status(200).json({ message: "No bookmarks found" });
    }
    // if the bookmarks exist, delete the bookmark
    userBookmarks.bookmarks = userBookmarks.bookmarks.filter((bookmark) => {
      if (type === "post") {
        return bookmark.item.id != bookmarkIds;
      } else {
        return !bookmarkIds.includes(bookmark._id.toString());
      }
    });

    await userBookmarks.save();
    // return success message
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
