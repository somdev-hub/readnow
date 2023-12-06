const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.send({
      status: 400,
      message: "Please enter all the fields"
    });
  }
  bcrypt.hash(password, 10, async (error, hash) => {
    if (error) {
      console.log(error);
      return res.send({
        status: 500,
        message: "Server error"
      });
    }
    const user = new User({
      email: email,
      password: hash
    });
    try {
      await user.save();
      jwt.sign(
        { user: user },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
        (err, token) => {
          if (err) {
            console.log(err);
            return res.send({
              status: 500,
              message: "Server error"
            });
          } else {
            return res.send({
              status: 200,
              message: "User added successfully",
              token: token
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.send({
        status: 500,
        message: "Server error"
      });
    }
  });
});

module.exports = router;
