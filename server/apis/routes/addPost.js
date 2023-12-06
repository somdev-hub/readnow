const express = require("express");
const PostModel = require("../models/post");
// const upload = require("../upload");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
require("dotenv").config();
const router = express.Router();
const axios = require("axios");
const { Readable } = require("stream");
const FormData = require("form-data");
const { v4: uuidv4 } = require('uuid');

var client = new MongoClient(process.env.MONGO_URI);

router.post("/", upload.single("image"), async (req, res) => {
  // try {
  //   await client.connect();

  //   const database = client.db(process.env.DATABASE);
  //   const gridFSBucket = new mongodb.GridFSBucket(database);

  //   const fileBuffer = req.file.buffer;
  //   const uploadStream = gridFSBucket.openUploadStream(req.file.originalname);

  //   uploadStream.write(fileBuffer);
  //   uploadStream.end();

  //   const imageId = uploadStream.id;
  //   const { description, postedBy } = req.body;
  //   console.log(req.body);

  //   const post = new PostModel({
  //     description,
  //     image: imageId,
  //     postedBy
  //   });

  //   await post.save();

  //   // res.status(200).send("File uploaded successfully!");

  //   res.status(200).json({ post });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).send("Internal Server Error");
  // }

  const strapi_api = "http://192.168.39.254:1337/api/posts";
  const image_strapi_api = "http://192.168.39.254:1337/api/upload";
  const { description, postedBy } = req.body;
  const image = req.file;

  const formData = new FormData();
  formData.append("files", Buffer.from(image.buffer), {
    filename: image.originalname,
    contentType: image.mimetype
  });

  try {
    const imageResponse = await axios.post(`${process.env.STRAPI_API}/api/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    const data = {
      data: {
        unique_id: uuidv4(),
        description,
        postedOn: new Date().toISOString(),
        image: imageResponse.data[0].id,
        likedBy: [],
        comments: [],
        postedBy
      }
    };

    const response = await axios.post(`${process.env.STRAPI_API}/api/posts`, JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json"
      }
    });

    res.status(200).send("post added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the post");
  }
});

module.exports = router;
