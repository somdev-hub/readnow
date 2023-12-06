const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticationController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ email: email });
    console.log(user.password);
    if (!user) {
      return res.send({
        status: 404,
        message: "User not found"
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.send({
        status: 401,
        message: "Invalid credentials"
      });
    }
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
            message: "User authenticated successfully",
            token: token
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Server error"
    });
  }
};

const decodeUserController = async (req, res) => {
  const { token } = req.body;
  //   console.log(token);
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.send({
          status: 500,
          message: err
        });
      } else {
        res.send({
          status: 200,
          message: "User decoded successfully",
          data: decoded
        });
      }
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Server error"
    });
  }
};

module.exports = {
  authenticationController,
  decodeUserController
};
