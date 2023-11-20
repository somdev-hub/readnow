const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
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
});

module.exports = router;
