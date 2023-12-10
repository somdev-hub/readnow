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
 * @routes {GET} /get-article-body/:url Route for getting article body.
 */

const express = require("express");
const {
  getHeadlinesController,
  searchHeadlinesController,
  getArticleBodyController
} = require("../controllers/newsController");

const router = express.Router();

// -------------------------- Routes -------------------------- //

// hit this route to get headlines
router.get("/get-headlines", getHeadlinesController);
// hit this route to search headlines
router.get("/search-headlines/:query", searchHeadlinesController);
// hit this route to get article body
router.get("/get-article-body/:url", getArticleBodyController);

module.exports = router;
