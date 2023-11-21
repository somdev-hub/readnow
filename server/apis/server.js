const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Bookmarks = require("./models/bookmarks");
const client = require("./sanity");
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

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
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

app.post("/check", upload.single("profilePicture"), async (req, res) => {
  const email = req.body.email;
  const profilePicture = req.file;

  try {
    client.assets
      .upload("image", profilePicture.buffer)
      .then((imageAsset) => {
        console.log(imageAsset);
        res.send({
          status: 200,
          message: "User updated successfully"
        });
      })
      .catch((error) => {
        console.log(error);
        res.send({
          status: 500,
          message: "Server error"
        });
      });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Server error"
    });
  }
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
app.use("/get-profile",getProfileRouter);

app.listen(3500, (error) => {
  if (error) {
    console.log("Error starting the server");
  }
  console.log("Server running on port", 3500);
});
