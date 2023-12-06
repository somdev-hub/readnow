const express = require("express");
const PostModel = require("../models/post");
const mongodb = require("mongodb");
require("dotenv").config();
const router = express.Router();
const axios = require("axios");

var client = new mongodb.MongoClient(process.env.MONGO_URI);

router.get("/", async (req, res) => {
  // try {
  //   await client.connect();

  //   const database = client.db(process.env.DATABASE);
  //   const gridFSBucket = new mongodb.GridFSBucket(database);

  //   const posts = await PostModel.find().sort({ createdAt: -1 });

  //   const postsWithImages = await Promise.all(
  //     posts.map(async (post) => {
  //       let image = await new Promise((resolve, reject) => {
  //         let imageChunks = [];
  //         const stream = gridFSBucket.openDownloadStream(
  //           new mongodb.ObjectId(post.image)
  //         );
  //         stream.on("data", (chunk) => {
  //           imageChunks.push(chunk);
  //         });
  //         stream.on("end", () => {
  //           resolve(Buffer.concat(imageChunks));
  //         });
  //         stream.on("error", (err) => {
  //           reject(err);
  //         });
  //       });
  //       return { ...post._doc, image: Buffer.from(image).toString("base64") };
  //     })
  //   );

  //   res.status(200).json({ posts: postsWithImages });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Internal Server Error");
  // }

  const strapi_api = "http://192.168.39.254:1337/api/posts?populate=*";

  try {
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/posts?populate=*`
    );
    const posts = response.data.data.reverse().map((post) => {
      return {
        ...post.attributes,
        id: post.id,
        image: `http://192.168.39.254:1337${post.attributes.image.data.attributes?.url}`
      };
    });
    if (posts.length > 0) {
      res.status(200).json({ posts });
    } else {
      res.status(200).json({ posts: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
});

module.exports = router;
