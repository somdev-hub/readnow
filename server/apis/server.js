const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
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
const { MongoClient } = require("mongodb");
const getFeedsRouter = require("./routes/getFeeds");
const getShortProfileInfoRouter = require("./routes/getShortProfileInfo");
const getAIRouter = require("./routes/getAI");
const addBookmarkRouter = require("./routes/addBookmark");
const getBookmarkRouter = require("./routes/getBookmark");

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

var client = new MongoClient(process.env.MONGO_URI);

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
app.use("/get-feeds", getFeedsRouter);
app.use("/get-short-profile-info", getShortProfileInfoRouter);
app.use("/get-ai", getAIRouter);
app.use("/add-bookmark", addBookmarkRouter);
app.use("/get-bookmarks", getBookmarkRouter);

app.listen(3500, (error) => {
  if (error) {
    console.log("Error starting the server");
  }
  console.log("Server running on port", 3500);
});
