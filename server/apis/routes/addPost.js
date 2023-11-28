const express = require("express");
const PostModel = require("../models/post");
const upload = require("../upload");
const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    await client.connect();

    const database = client.db(process.env.DATABASE);
    const gridFSBucket = new mongodb.GridFSBucket(database);

    const fileBuffer = req.file.buffer;
    const uploadStream = gridFSBucket.openUploadStream(req.file.originalname);

    uploadStream.write(fileBuffer);
    uploadStream.end();

    const imageId = uploadStream.id;
    const { description, postedBy } = req.body;
    console.log(req.body);

    const post = new PostModel({
      description,
      image: imageId,
      postedBy
    });

    await post.save();

    // res.status(200).send("File uploaded successfully!");
    
    res.status(200).json({ post });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
