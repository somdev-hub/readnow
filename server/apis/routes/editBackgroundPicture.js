const express = require("express");
const User = require("../models/user");
const client = require("../sanity");
const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("backgroundPicture"), async (req, res) => {
  const backgroundPicture = req.file;
  const email = req.body.email;
  try {
    client.assets
      .upload("image", backgroundPicture.buffer)
      .then(async (imageAsset) => {
        console.log(imageAsset.url);
        const updatesData = await User.findOneAndUpdate(
          { email: email },
          {
            backgroundPicture: imageAsset.url
          },
          { upsert: true, new: true }
        );
        if (!updatesData) {
          return res.send({
            status: 404,
            message: "User not found"
          });
        } else {
          res.send({
            status: 200,
            message: "User updated successfully"
          });
        }
      });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Server error"
    });
  }
});

module.exports = router;
