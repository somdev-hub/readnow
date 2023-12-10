/**
 * @file newsController.js
 * @description News Controller for handling news.
 * @module News Controller
 *
 * @requires axios Axios for handling requests.
 * @requires jsdom JSDOM for handling DOM.
 * @requires Readability Readability for handling article content.
 *
 * @exports getHeadlinesController
 * @exports searchHeadlinesController
 * @exports getArticleBodyController
 *
 */

const axios = require("axios");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

/**
 * @function getHeadlinesController
 * @description Controller for getting headlines.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object with status and headlines.
 *
 * @example
 * // GET /
 * // Returns: { "status": 200, "headlines": [ ... ] }
 *
 */
const getHeadlinesController = async (req, res) => {
  axios
    .get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=719a6f11a1024e619d328e8387a80add`
    )
    .then((response) => {
      res.send(response.data.articles);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * @function searchHeadlinesController
 * @description handles searching headlines through query.
 * @async
 * @param {Object} req - Express request object.
 * @param {string} req.params.query - Query to search.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object with status and headlines.
 *
 * @example
 * // GET /search/:query
 * // Returns: { "status": 200, "headlines": [ ... ] }
 *
 */
const searchHeadlinesController = async (req, res) => {
  const query = req.params.query;
  axios
    .get(
      `https://newsapi.org/v2/everything?q=${query}&apiKey=719a6f11a1024e619d328e8387a80add`
    )
    .then((response) => {
      res.send(response.data.articles);
    })
    .catch((error) => {
      console.log(error);
    });
};

/**
 * @function getArticleBodyController
 * @description Controller for getting article body.
 * @async
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.url - URL of the article.
 * @param {Object} res - Express response object.
 * @returns {Object} Response object with status and article body.
 *
 * @example
 * // GET /article-body/:url
 * // Request params: { "url": "https://example.com" }
 * // Returns: { "status": 200, "body": "..." }
 *
 * @throws {500} If there is a server error.
 */

const getArticleBodyController = async (req, res) => {
  const { url } = req.body;
  try {
    async function getArticle() {
      try {
        // get the article
        const response = await axios.get(url);
        // parse the article using Readability and JSDOM to get the content of the article
        const dom = new JSDOM(response.data, { url: url });
        const reader = new Readability(dom.window.document).parse();

        return reader.textContent;
      } catch (error) {
        // console.log(error);
      }
    }
    const content = await getArticle();
    return res.send(content);
  } catch (error) {
    return res.send({
      error: error,
      status: 500
    });
  }
};

module.exports = {
  getHeadlinesController,
  searchHeadlinesController,
  getArticleBodyController
};
