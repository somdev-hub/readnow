const express = require("express");
const User = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  const { name, header, description, tags } = req.body;
  // console.log(req.body);
  const email = req.body.email;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: email },
      {
        name: name,
        header: header,
        description: description,
        tags: tags
      },
      { upsert: true, new: true }
    );
    if (!updatedUser) {
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
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Server error"
    });
  }
});

module.exports = router;
