const express = require("express");
const UserModel = require("../models/user");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    const users = await UserModel.findOne({ email });

    const shortData = {
      name: users.name,
      email: users.email,
      profilePicture: users.profilePicture,
      header: users.header
    };
    res.status(200).json({ data: shortData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;