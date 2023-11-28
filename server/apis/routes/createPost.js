const express = require("express");
const router = express.Router();
const client = require("../apis/sanity");

router.post("/", async (req, res) => {
  const { title, body, author } = req.body;
  const data = {
    _type: "posts",
    title,
    body,
    author,
    image,
    publishedAt: new Date().toISOString()
  };
  try {
    const response = await client.create(data);
    res.json(response);
  } catch (error) {
    console.log(error);
  }
});
