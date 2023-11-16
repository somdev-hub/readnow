const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");
const mongoose = require("mongoose");
const Bookmarks = require("./schema");

const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    if (error) console.log(error);
  });

app.post("/bookmarks", async (req, res) => {
  const { username, bookmark } = req.body;
  // console.log(req.body);
  try {
    await Bookmarks.findOneAndUpdate(
      { user: username },
      { $push: { bookmarks: bookmark } },
      { upsert: true, new: true }
    );

    res.send({
      status: 200
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      status: 500,
      message: "Server error"
    });
  }
});

app.get("/", (req, res) => {
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

app.get("/search/:query", (req, res) => {
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

app.post("/article", async (req, res) => {
  // const { url } = await req.json();
  // console.log(res.json());
  // console.log(req.body);
  const url = req.body.url;
  // console.log(url);
  try {
    async function getArticle() {
      try {
        const response = await axios.get(url);

        const dom = new JSDOM(response.data, { url: url });
        const reader = new Readability(dom.window.document).parse();
        // console.log(reader.textContent);
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

app.listen(3500, (error) => {
  if (error) {
    console.log("Error starting the server");
  }
  console.log("Server running on port", 3500);
});
