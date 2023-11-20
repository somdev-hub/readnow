const express = require("express");
const client = require("../sanity");
const multer = require("multer");
const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/check", upload.single("profilePicture"), async (req, res) => {
  const email = req.body.email;
  const profilePicture = req.file;
  console.log(profilePicture);
  try {
    client.assets
      .upload("image", profilePicture)
      .then((imageAsset) => {
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

module.exports = router;
