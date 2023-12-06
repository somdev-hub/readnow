const express = require("express");
const {
  getHeadlinesController,
  searchHeadlinesController,
  getArticleBodyController
} = require("../controllers/newsController");

const router = express.Router();

router.get("/get-headlines", getHeadlinesController);
router.get("/search-headlines/:query", searchHeadlinesController);
router.post("/get-article-body", getArticleBodyController);

module.exports = router;
