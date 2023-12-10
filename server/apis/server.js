/**
 * @file server.js
 * @description This is the main entry point for the server. It sets up and starts the server.
 * @usage `node server.js`
 * @notes This file is the main entry point for the server. It sets up and starts the server. It also imports all the routes and middleware.
 *
 * @requires express A fast, unopinionated, minimalist web framework for Node.js.
 * @requires cors Node.js CORS middleware.
 * @requires body-parser Node.js body parsing middleware.
 * @requires dotenv Zero-dependency module that loads environment variables from a `.env` file into `process.env`.
 * @requires mongoose MongoDB object modeling tool designed to work in an asynchronous environment.
 * @requires multer A node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files.
 *
 * @requires ./routes/getAI Route for getting AI data.
 * @requires ./routes/postRoute Route for handling posts.
 * @requires ./routes/profileRoute Route for handling user profiles.
 * @requires ./routes/newsRoute Route for handling news.
 * @requires ./routes/authRoute Route for handling authentication.
 * @requires ./routes/bookmarkRoute Route for handling bookmarks.
 * @requires ./routes/peopleRoute Route for handling people.
 *
 * @function express Initializes and returns an instance of Express application.
 * @function dotenv.config Loads environment variables from a `.env` file into `process.env`.
 * @function app.use Mounts the specified middleware function or functions at the specified path.
 */

// import dependencies
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const getAIRouter = require("./routes/getAI");
const postRouter = require("./routes/postRoute");
const profileRouter = require("./routes/profileRoute");
const newsRouter = require("./routes/newsRoute");
const authRouter = require("./routes/authRoute");
const bookmarkRouter = require("./routes/bookmarkRoute");
const peopleRouter = require("./routes/peopleRoute");

// initialize express
const app = express();
//initialize dotenv
dotenv.config();
// initialize cors
app.use(cors());
// initialize body-parser for both json and urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database connection establishment
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    if (error) console.log(error);
  });

// routes
app.use("/get-ai", getAIRouter);
app.use("/post", postRouter);
app.use("/profile", profileRouter);
app.use("/news", newsRouter);
app.use("/auth", authRouter);
app.use("/bookmark", bookmarkRouter);
app.use("/people", peopleRouter);

// start the server
const port = process.env.PORT || 3500;
app.listen(port, (error) => {
  if (error) {
    console.log("Error starting the server");
  }
  console.log("Server running on port", port);
});
