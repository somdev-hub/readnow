const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const client = require("../sanity");
const uploadImage = require("../utils/uploadImage");

const addUserController = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!email || !password) {
    return res.status(400).json({
      message: "Please enter all fields"
    });
  }
  bcrypt.hash(password, 10, async (error, hash) => {
    if (error) {
      console.log(error);
      return res.json({ status: 400, message: "Server error" });
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
            return res.json({ status: 500, message: "Server error" });
          } else {
            return res.json({
              status: 200,
              message: "User added successfully",
              token: token
            });
          }
        }
      );
    } catch (error) {
      console.log(error);
      return res.json({
        status: 500,
        message: "Server error"
      });
    }
  });
};

const editProfileController = async (req, res) => {
  // log
  const {
    name,
    header,
    description,
    tags,
    isBackgroundPictureSame,
    isProfilePictureSame
  } = req.body;
  // console.log(tags);
  const profilePicture = req?.files?.profilePicture[0];
  // console.log(profilePicture);
  const backgroundPicture = req?.files?.backgroundPicture[0];
  const email = req.params.email;
  try {
    let profilePictureUrl = "";
    let backgroundPictureUrl = "";
    if (profilePicture && isProfilePictureSame === "false") {
      profilePictureUrl = await uploadImage(profilePicture);
    }

    // console.log(backgroundPictureUrl);
    if (backgroundPicture && isBackgroundPictureSame === "false") {
      backgroundPictureUrl = await uploadImage(backgroundPicture);
    }

    const data = {
      name: name,
      header: header,
      description: description,
      tags: JSON.parse(tags),
      followers: 0,
      following: 0,
      posts: 0,
      otherEmails: [
        {
          email: email,
          isPrimary: true
        }
      ]
    };

    if (isProfilePictureSame === "false") {
      data.profilePicture = profilePictureUrl;
    }

    if (isBackgroundPictureSame === "false") {
      data.backgroundPicture = backgroundPictureUrl;
    }

    const updatedUser = await User.findOneAndUpdate({ email: email }, data, {
      upsert: true,
      new: true
    });
    if (!updatedUser) {
      return res.json({
        status: 404,
        message: "User not found"
      });
    } else {
      res.json({
        status: 200,
        message: "User updated successfully"
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
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
    const profilePictureUrl = await uploadImage(profilePicture);
    const updatesData = await User.findOneAndUpdate(
      { email },
      {
        profilePicture: profilePictureUrl
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
  console.log("hello");
  const email = req.body.email;
  try {
    const backgroundPictureUrl = await uploadImage(backgroundPicture);
    const updatesData = await User.findOneAndUpdate(
      { email },
      {
        backgroundPicture: backgroundPictureUrl
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
  } catch (error) {
    console.log(error);
    res.send({
      status: 500,
      message: "Server error"
    });
  }
};

const getProfileController = async (req, res) => {
  const { email } = req.params;
  // console.log(req.body);
  try {
    const userData = await User.findOne({ email: email });
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/posts?filters[postedBy][$eq]=${email}&populate=*`
    );
    const posts = response?.data?.data?.reverse().map((post) => {
      return {
        ...post.attributes,
        id: post.id,
        image:
          post?.attributes?.image?.data?.attributes?.url &&
          `${process.env.STRAPI_API}${post?.attributes?.image?.data?.attributes?.url}`
      };
    });

    const storiesDataDateWise = await userData.stories.reduce(
      async (accPromise, story) => {
        const acc = await accPromise;
        const date = new Date(story.dateTime).toDateString();
        const viewedBy = await Promise.all(
          story.viewedBy.map(async (email) => {
            const user = await User.findOne({ email });
            return {
              name: user.name,
              profilePicture: user.profilePicture
            };
          })
        );

        if (acc[date]) {
          acc[date].push({ ...story, viewedBy });
        } else {
          acc[date] = [{ ...story, viewedBy }];
        }

        return acc;
      },
      Promise.resolve({})
    );

    const responseObj = {
      data: {
        userData: {
          name: userData.name,
          email: userData.email,
          profilePicture: userData.profilePicture,
          description: userData.description,
          header: userData.header,
          backgroundPicture: userData.backgroundPicture,
          tags: userData.tags,
          followers: userData.followers,
          following: userData.following,
          otherEmails: userData.otherEmails,
          notifications: userData.Notifications,
          groups: userData.groups,
          publishers: userData.publishers
        },
        postData: posts,
        storiesData: storiesDataDateWise
      }
    };

    if (!userData) {
      return res.send({
        status: 404,
        message: "User not found"
      });
    } else {
      res.status(200).send(responseObj);
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
      header: users.header,
      followers: users.followers.length
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

const getUserFollowersController = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(200).json({ followers: user.followers });
    } else {
      res.status(404).json("User not found");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
};

const toggleOtherEmailsController = async (req, res) => {
  const { otherEmail } = req.body;
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (user) {
      if (user.otherEmails.some((e) => e.email === otherEmail)) {
        await User.updateOne(
          { email },
          { $pull: { otherEmails: { email: otherEmail } } }
        );
      } else {
        await User.updateOne(
          { email },
          {
            $addToSet: {
              otherEmails: {
                email: otherEmail,
                isPrimary: false
              }
            }
          },
          { upsert: true, new: true }
        );
      }
      res.status(200).json({ message: "Email toggled successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).send({ message: "Internal server error" });
  }
};

const setPrimaryEmailController = async (req, res) => {
  const { otherEmail } = req.body;
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (user) {
      await User.updateOne(
        { email },
        { $set: { "otherEmails.$[elem].isPrimary": true } },
        { arrayFilters: [{ "elem.email": otherEmail }] }
      );
      await User.updateOne(
        { email },
        { email: otherEmail },
        { upsert: true, new: true }
      );
      await User.updateOne(
        { email: otherEmail },
        { $set: { "otherEmails.$[elem].isPrimary": false } },
        { arrayFilters: [{ "elem.email": { $ne: otherEmail } }] }
      );
      res.status(200).json({ message: "Primary email set successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal server error" });
  }
};

const changePasswordController = async (req, res) => {
  const { password, newPassword } = req.body;
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, async (error, result) => {
        if (result) {
          bcrypt.hash(newPassword, 10, async (error, hash) => {
            if (error) {
              console.log(error);
              return res.json({ message: "Server error" });
            }
            await User.updateOne({ email }, { password: hash });
            return res.json({
              status: 200,
              message: "Password changed successfully"
            });
          });
        } else {
          return res.json({ status: 400, message: "Incorrect password" });
        }
      });
    } else {
      return res.json({ status: 404, message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "Server error" });
  }
};

const addStoryController = async (req, res) => {
  const { email } = req.params;
  const story = req?.file;
  // console.log(story);
  try {
    const user = await User.findOne({ email });
    if (user) {
      const storyUrl = await uploadImage(story);
      await User.updateOne(
        { email },
        {
          $push: {
            stories: {
              url: storyUrl,
              dateTime: new Date(),
              id: user.stories.length + 1,
              views: 0,
              viewedBy: []
            }
          }
        }
      );
      res.status(200).json({ message: "Story added successfully" });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getMyStoriesController = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email }).populate("stories");
    if (user) {
      const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      const latestStories = user.stories
        .filter((story) => story.dateTime > twentyFourHoursAgo)
        .map(async ({ id, url, dateTime, views, viewedBy }) => {
          const viewedByUsers = await User.find({ email: { $in: viewedBy } });
          const viewedByData = viewedByUsers.map(
            ({ name, profilePicture }) => ({
              name,
              profilePicture
            })
          );
          return {
            id,
            url,
            dateTime,
            views,
            viewedBy: viewedByData
          };
        });
      if (latestStories.length === 0) {
        return res.status(404).json({ stories: null });
      }
      const responseStories = {
        name: user.name,
        email: user.email,
        profilePicture: user.profilePicture,
        stories: await Promise.all(latestStories)
      };
      return res.status(200).json({ stories: responseStories });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
};

const getFollowingStoriesController = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email }).populate("following");
    if (user) {
      if (user.following.length === 0) {
        return res.status(200).json({ stories: [] });
      }
      const followingStories = await Promise.all(
        user.following.map(async (following) => {
          const followingUser = await User.findOne({ email: following });
          const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
          const storiesWithin24Hours = followingUser?.stories.filter(
            (story) => story.dateTime > twentyFourHoursAgo
          );
          if (storiesWithin24Hours?.length !== 0) {
            return {
              name: followingUser.name,
              email: followingUser.email,
              profilePicture: followingUser?.profilePicture,
              stories: storiesWithin24Hours
            };
          } else {
            return {
              name: followingUser.name,
              email: followingUser.email,
              profilePicture: followingUser.profilePicture,
              stories: []
            };
          }
        })
      );

      const filteredStories = followingStories.filter(
        (story) => story !== null
      );
      const sortedStories = filteredStories.sort(
        (a, b) => b.dateTime - a.dateTime
      );
      res.status(200).json({ stories: sortedStories });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const addStoryViewCountController = async (req, res) => {
  const { storyUserEmail, storyId } = req.body;
  const { email } = req.params;
  try {
    const user = await User.findOne({ email: storyUserEmail });
    if (user) {
      const story = user.stories.find((story) => story.id === storyId);
      if (story) {
        if (!story.viewedBy.includes(email)) {
          await User.updateOne(
            { email: storyUserEmail, "stories.id": storyId },
            {
              $inc: { "stories.$.views": 1 },
              $push: { "stories.$.viewedBy": email }
            }
          );
          res.status(200).json({ message: "View count updated successfully" });
        } else {
          res.status(200).json({ message: "View count already updated" });
        }
      } else {
        res.status(404).json({ message: "Story not found" });
      }
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

const getAllStroiesController = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({
      email
    }).populate("stories");
    if (user) {
      return res.status(200).json({ stories: user.stories });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
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
  getCardProfileInfoController,
  getUserFollowersController,
  toggleOtherEmailsController,
  setPrimaryEmailController,
  changePasswordController,
  addStoryController,
  getMyStoriesController,
  getFollowingStoriesController,
  addStoryViewCountController,
  getAllStroiesController
};
