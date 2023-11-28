const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Bookmarks = require("./models/bookmarks");
// const client = require("./sanity");
const multer = require("multer");
const searchHeadlinesRouter = require("./routes/searchHeadlines");
const getHeadlinesRouter = require("./routes/getHeadlines");
const getArticleBodyRouter = require("./routes/getArticleBody");
const addUserRouter = require("./routes/addUser");
const editProfilePictureRouter = require("./routes/editProfilePicture");
const editBackgroundPictureRouter = require("./routes/editBackgroundPicture");
const editProfileRouter = require("./routes/editProfile");
const decodeUserRouter = require("./routes/decodeUser");
const authenticateRouter = require("./routes/authenticate");
const getProfileRouter = require("./routes/getUserDetails");
const addPostRouter = require("./routes/addPost");
const connection = require("./database");
const Grid = require("gridfs-stream");
const { MongoClient } = require("mongodb");
const mongodb = require("mongodb");
const PostModel = require("./models/post");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    if (error) console.log(error);
  });

// let gfs, gridFsBucket;
// connection();
// const conn = mongoose.connection;
// conn.once("open", function () {
//   // Add this line in the code
//   gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
//     bucketName: "posts"
//   });
//   gfs = Grid(conn.db, mongoose.mongo);
//   gfs.collection("photos");
// });

var client = new MongoClient(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use("/get-headlines", getHeadlinesRouter);

app.use("/search", searchHeadlinesRouter);

app.use("/article", getArticleBodyRouter);

app.use("/add-user", addUserRouter);

app.use("/authenticate", authenticateRouter);
app.use("/decode", decodeUserRouter);
app.use("/edit-profile", editProfileRouter);
app.use("/edit-profile-picture", editProfilePictureRouter);
app.use("/edit-background-picture", editBackgroundPictureRouter);
app.use("/get-profile", getProfileRouter);
app.use("/add-post", addPostRouter);

// app.post('/upload', upload.single('file'), (req, res) => {
//   // res.redirect('/');
//   res.status(200).json({ file: req.file });
// });

app.post("/upload", upload.single("image"), async (req, res) => {
  try {
    var client = new MongoClient(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await client.connect();

    const database = client.db(process.env.DATABASE);
    const gridFSBucket = new mongodb.GridFSBucket(database);

    const fileBuffer = req.file.buffer;
    const uploadStream = gridFSBucket.openUploadStream(req.file.originalname);

    uploadStream.write(fileBuffer);
    uploadStream.end();

    res.status(200).send("File uploaded successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    client.close();
  }
});

app.post("/upload-post", upload.single("image"), async (req, res) => {
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

app.get("/get-posts", async (req, res) => {
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
});

app.listen(3500, (error) => {
  if (error) {
    console.log("Error starting the server");
  }
  console.log("Server running on port", 3500);
});
