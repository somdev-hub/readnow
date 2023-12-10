

const PostModel = require("../models/post");
const mongodb = require("mongodb");
require("dotenv").config();

//
var client = new mongodb.MongoClient(process.env.MONGO_URI);

const feedController = async (req, res) => {
  try {
    await client.connect();

    const database = client.db(process.env.DATABASE);
    const gridFSBucket = new mongodb.GridFSBucket(database);

    const posts = await PostModel.find().sort({ createdAt: -1 });

    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        let image = await new Promise((resolve, reject) => {
          let imageChunks = [];
          const stream = gridFSBucket.openDownloadStream(
            new mongodb.ObjectId(post.image)
          );
          stream.on("data", (chunk) => {
            imageChunks.push(chunk);
          });
          stream.on("end", () => {
            resolve(Buffer.concat(imageChunks));
          });
          stream.on("error", (err) => {
            reject(err);
          });
        });
        return { ...post._doc, image: Buffer.from(image).toString("base64") };
      })
    );

    res.status(200).json({ posts: postsWithImages });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getProfileFeeds = async (email) => {
  try {
    await client.connect();

    const database = client.db(process.env.DATABASE);
    const gridFSBucket = new mongodb.GridFSBucket(database);

    const posts = await PostModel.find({ postedBy: email }).sort({
      createdAt: -1
    });

    const postsWithImages = await Promise.all(
      posts.map(async (post) => {
        let image = await new Promise((resolve, reject) => {
          let imageChunks = [];
          const stream = gridFSBucket.openDownloadStream(
            new mongodb.ObjectId(post.image)
          );
          stream.on("data", (chunk) => {
            imageChunks.push(chunk);
          });
          stream.on("end", () => {
            resolve(Buffer.concat(imageChunks));
          });
          stream.on("error", (err) => {
            reject(err);
          });
        });
        return { ...post._doc, image: Buffer.from(image).toString("base64") };
      })
    );

    return postsWithImages;
  } catch (error) {
    console.error(error);
    return [];
  }
};

module.exports = { feedController, getProfileFeeds };
