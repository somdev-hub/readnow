const axios = require("axios");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

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

const getArticleBodyController = async (req, res) => {
  const { url } = req.params;
  // console.log(req.body);
  try {
    async function getArticle() {
      try {
        const response = await axios.get(url);

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
