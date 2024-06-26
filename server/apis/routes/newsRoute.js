/**
 * @file newsRoute.js
 * @description News Route for handling news.
 * @module News Route
 *
 * @requires express Express web framework for Node.js
 * @requires getHeadlinesController Get Headlines Controller for handling getting headlines.
 * @requires searchHeadlinesController Search Headlines Controller for handling searching headlines.
 *
 * @routes {GET} /get-headlines Route for getting headlines.
 * @routes {GET} /search-headlines/:query Route for searching headlines.
 * @routes {POST} /get-article-body/:url Route for getting article body.
 */

const express = require("express");
const {
  getHeadlinesController,
  searchHeadlinesController,
  getArticleBodyController
} = require("../controllers/newsController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

// -------------------------- Routes -------------------------- //

// hit this route to get headlines
router.get("/get-headlines", authenticateToken, getHeadlinesController);
// hit this route to search headlines
router.get(
  "/search-headlines/:query",
  authenticateToken,
  searchHeadlinesController
);
// hit this route to get article body
router.post("/get-article-body", authenticateToken, getArticleBodyController);

module.exports = router;
