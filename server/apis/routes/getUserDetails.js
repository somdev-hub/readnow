const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Post = require("../models/post");
const { getProfileFeeds } = require("../controllers/feedController");
const axios = require("axios");

router.post("/", async (req, res) => {
  const { email } = req.body;
  // console.log(req.body);
  try {
    const userData = await User.findOne({ email: email });
    const postData = await getProfileFeeds(email);
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/posts?email=${email}&populate=*`
    );
    const posts = response.data.data.reverse().map((post) => {
      return {
        ...post.attributes,
        image: `http://192.168.39.254:1337${post.attributes.image.data.attributes?.url}`
      };
    });

    if (!userData) {
      return res.send({
        status: 404,
        message: "User not found"
      });
    } else {
      res.send({
        status: 200,
        message: "User found",
        data: {
          userData: userData,
          postData: posts
        }
      });
      // console.log(userData);
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
