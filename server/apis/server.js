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
 * @requires ./routes/groupRoute Route for handling groups.
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
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const axios = require("axios");

const getAIRouter = require("./routes/getAI");
const postRouter = require("./routes/postRoute");
const profileRouter = require("./routes/profileRoute");
const newsRouter = require("./routes/newsRoute");
const authRouter = require("./routes/authRoute");
const bookmarkRouter = require("./routes/bookmarkRoute");
const peopleRouter = require("./routes/peopleRoute");
const groupRouter = require("./routes/groupRoute");
const eventRouter = require("./routes/eventRoute");

// initialize express
const app = express();

const server = createServer(app);

const io = new Server(server);

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

io.on("connection", (socket) => {
  console.log("a user connected");
  let eventId;

  // Join the room for the event
  socket.on("joinEvent", (id) => {
    eventId = id;
    console.log(id);
    socket.join(eventId);
  });

  // Listen for new comments
  socket.on("postEventComment", async (id, email, comment) => {
    // Broadcast the comment to all users in the event room
    console.log(comment);
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/events/${id}`
    );
    const comments = response.data.data.attributes.eventComments;
    let newComments = [
      ...comments,
      {
        commentedBy: email,
        comment: comment,
        commentedOn: new Date().toISOString()
      }
    ];
    const data = {
      data: {
        eventComments: newComments
      }
    };

    const commentResponse = await axios.put(
      `${process.env.STRAPI_API}/api/events/${id}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    io.to(id).emit("newComment", { email, comment });
  });

  // Leave the room when the user disconnects
  socket.on("disconnect", () => {
    console.log("user disconnected");
    if (eventId) {
      socket.leave(eventId);
    }
  });
});

// routes
app.use("/get-ai", getAIRouter);
app.use("/post", postRouter);
app.use("/profile", profileRouter);
app.use("/news", newsRouter);
app.use("/auth", authRouter);
app.use("/bookmark", bookmarkRouter);
app.use("/people", peopleRouter);
app.use("/group", groupRouter);
app.use("/event", eventRouter);

// start the server
const port = process.env.PORT || 3500;
server.listen(port, (error) => {
  if (error) {
    console.log("Error starting the server");
  }
  console.log("Server running on port", port);
});
