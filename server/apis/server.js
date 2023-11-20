const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const axios = require("axios");
const { JSDOM } = require("jsdom");
const { Readability } = require("@mozilla/readability");
const mongoose = require("mongoose");
const Bookmarks = require("./models/bookmarks");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const checkSanityRouter = require("./routes/checkSanity");
const client = require("./sanity");
const multer = require("multer");
const { Readable } = require("stream");
const searchHeadlinesRouter = require("./routes/searchHeadlines");
const getHeadlinesRouter = require("./routes/getHeadlines");
const getArticleBodyRouter = require("./routes/getArticleBody");
const addUserRouter = require("./routes/addUser");
const editProfilePictureRouter = require("./routes/editProfilePicture");
const editBackgroundPictureRouter = require("./routes/editBackgroundPicture");
const editProfileRouter = require("./routes/editProfile");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

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

// app.get("/", (req, res) => {
//   axios
//     .get(
//       `https://newsapi.org/v2/top-headlines?country=in&apiKey=719a6f11a1024e619d328e8387a80add`
//     )
//     .then((response) => {
//       res.send(response.data.articles);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

app.use("/get-headlines", getHeadlinesRouter);

// app.get("/search/:query", (req, res) => {
//   const query = req.params.query;
//   axios
//     .get(
//       `https://newsapi.org/v2/everything?q=${query}&apiKey=719a6f11a1024e619d328e8387a80add`
//     )
//     .then((response) => {
//       res.send(response.data.articles);
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// });

app.use("/search", searchHeadlinesRouter);

// app.post("/article", async (req, res) => {
//   const url = req.body.url;
//   try {
//     async function getArticle() {
//       try {
//         const response = await axios.get(url);

//         const dom = new JSDOM(response.data, { url: url });
//         const reader = new Readability(dom.window.document).parse();

//         return reader.textContent;
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     const content = await getArticle();
//     return res.send(content);
//   } catch (error) {
//     return res.send({
//       error: error,
//       status: 500
//     });
//   }
// });

app.use("/article", getArticleBodyRouter);

// app.post("/addUser", (req, res) => {
//   const { email, password } = req.body;
//   console.log(req.body);
//   if (!email || !password) {
//     return res.send({
//       status: 400,
//       message: "Please enter all the fields"
//     });
//   }
//   bcrypt.hash(password, 10, async (error, hash) => {
//     if (error) {
//       console.log(error);
//       return res.send({
//         status: 500,
//         message: "Server error"
//       });
//     }
//     const user = new User({
//       email: email,
//       password: hash
//     });
//     try {
//       await user.save();
//       return res.send({
//         status: 200,
//         message: "User added successfully"
//       });
//     } catch (error) {
//       console.log(error);
//       return res.send({
//         status: 500,
//         message: "Server error"
//       });
//     }
//   });
// });

app.use("/add-user", addUserRouter);

// app.post("/edit-profile", async (req, res) => {
//   const { name, profilePicture, backgroundPicture, header, description, tags } =
//     req.body;
//   const email = req.body.email;
//   try {
//     await User.findOneAndUpdate(
//       { email: email },
//       {
//         name: name,
//         profilePicture: profilePicture,
//         backgroundPicture: backgroundPicture,
//         header: header,
//         description: description,
//         tags: tags
//       },
//       { upsert: true, new: true }
//     );
//     res.send({
//       status: 200,
//       message: "User updated successfully"
//     });
//   } catch (error) {
//     console.log(error);
//     res.send({
//       status: 500,
//       message: "Server error"
//     });
//   }
// });

app.use("/edit-profile", editProfileRouter);
app.use("/edit-profile-picture", editProfilePictureRouter);
app.use("/edit-background-picture", editBackgroundPictureRouter);

app.listen(3500, (error) => {
  if (error) {
    console.log("Error starting the server");
  }
  console.log("Server running on port", 3500);
});
