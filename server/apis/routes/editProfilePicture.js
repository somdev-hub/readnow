const express = require("express");
const User = require("../models/user");
const client = require("../sanity");
const multer = require("multer");
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/", upload.single("profilePicture"), async (req, res) => {
  const profilePicture = req.file;
  console.log(profilePicture);
  const email = req.body.email;
  try {
    client.assets
      .upload("image", profilePicture.buffer)
      .then(async (imageAsset) => {
        console.log(imageAsset.url);
        await User.findOneAndUpdate(
          { email: email },
          {
            profilePicture: imageAsset.url
          },
          { upsert: true, new: true }
        );
        res.send({
          status: 200,
          message: "User updated successfully"
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

module.exports = router;
