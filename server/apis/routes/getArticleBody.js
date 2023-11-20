const express = require("express");
const router = express.Router();
const axios = require("axios");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");

router.get("/", async (req, res) => {
  const url = req.body.url;
  try {
    async function getArticle() {
      try {
        const response = await axios.get(url);

        const dom = new JSDOM(response.data, { url: url });
        const reader = new Readability(dom.window.document).parse();

        return reader.textContent;
      } catch (error) {
        console.log(error);
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
});

module.exports = router;
