const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const client = require("../sanity");

const addUserController = async (req, res) => {
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
};

const editProfileController = async (req, res) => {
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
        tags: tags,
        followers: 0,
        following: 0,
        posts: 0
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
};

const editProfilePictureController = async (req, res) => {
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
};

const editBackgroundPictureController = async (req, res) => {
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
};

const getProfileController = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  try {
    const userData = await User.findOne({ email: email });
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/posts?filters[postedBy][$eq]=${email}&populate=*`
    );
    const posts = response.data.data.reverse().map((post) => {
      return {
        ...post.attributes,
        id: post.id,
        image: `${process.env.STRAPI_API}${post.attributes.image.data.attributes?.url}`
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
};

const getShortProfileInfoController = async (req, res) => {
  try {
    const { email } = req.body;
    // console.log(email)
    const users = await User.findOne({ email });
    // console.log(users)

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
};

const getCardProfileInfoController = async (req, res) => {
  try {
    const { email } = req.params;
    console.log(email);
    const users = await User.findOne({ email });
    const shortData = {
      name: users.name,
      email: users.email,
      profilePicture: users.profilePicture,
      header: users.header,
      backgroundPicture: users.backgroundPicture,
      tags: users.tags,
      followers: users.followers
    };

    res.status(200).json({ data: shortData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const handleFollowController = async (req, res) => {
  const { email, followerEmail } = req.body;
  try {
    const users = await User.find({ email: { $in: [email, followerEmail] } });
    if (users.length !== 2) {
      return res.send({
        status: 404,
        message: "User or follower not found"
      });
    }
    const [userData, followerData] = users;
    // console.log(userData.followers, followerEmail);
    try {
      if (userData.following.includes(followerEmail)) {
        // console.log("true");
        await User.updateOne(
          { email: followerEmail },
          { $pull: { followers: email } },
          { upsert: true, new: true }
        );
        await User.updateOne(
          { email: email },
          { $pull: { following: followerEmail } },
          { upsert: true, new: true }
        );
      } else {
        await User.updateOne(
          { email: followerEmail },
          { $addToSet: { followers: email } },
          { upsert: true, new: true }
        );
        await User.updateOne(
          { email: email },
          { $addToSet: { following: followerEmail } },
          { upsert: true, new: true }
        );
      }
    } catch (error) {
      console.error(error);
    }
    res.send({
      status: 200,
      message: "Follower added or removed successfully"
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Server error"
    });
  }
};

const getProfileGroups = async (req, res) => {
  try {
    const { email } = req.params;
    const groups = await User.findOne({ email }).populate("groups");
    res.status(200).json({ data: groups.groups });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  addUserController,
  editProfileController,
  editProfilePictureController,
  editBackgroundPictureController,
  getProfileController,
  getShortProfileInfoController,
  handleFollowController,
  getProfileGroups,
  getCardProfileInfoController
};
