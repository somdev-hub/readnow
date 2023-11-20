const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/:query", async (req, res) => {
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
});

module.exports = router;