const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const getAIRouter = require("./routes/getAI");
const postRouter = require("./routes/postRoute");
const profileRouter = require("./routes/profileRoute");
const newsRouter = require("./routes/newsRoute");
const authRouter = require("./routes/authRoute");
const bookmarkRouter = require("./routes/bookmarkRoute");
const peopleRouter = require("./routes/peopleRoute");

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

app.use("/get-ai", getAIRouter);
app.use("/post", postRouter);
app.use("/profile", profileRouter);
app.use("/news", newsRouter);
app.use("/auth", authRouter);
app.use("/bookmark", bookmarkRouter);
app.use("/people", peopleRouter);

app.listen(3500, (error) => {
  if (error) {
    console.log("Error starting the server");
  }
  console.log("Server running on port", 3500);
});
