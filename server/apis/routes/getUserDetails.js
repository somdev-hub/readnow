const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/", async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await User.findOne({ email: email });
    if (!userData) {
      return res.send({
        status: 404,
        message: "User not found"
      });
    } else {
      res.send({
        status: 200,
        message: "User found",
        data: userData
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