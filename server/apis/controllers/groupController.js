const Group = require("../models/groups");
const User = require("../models/user");
const FormData = require("form-data");
const axios = require("axios");

const createGroupController = async (req, res) => {
  // const {
  //   groupName,
  //   groupDescription,
  //   groupAdmins,
  //   groupRules,
  //   groupTags,
  //   groupGenre,
  //   groupLocation,
  //   groupVisibility
  // } = req.body;

  console.log(req.body);
  // console.log(req.files);
  const groupImage = req.files.groupImage ? req.files.groupImage[0] : undefined;
  const groupCoverImage = req.files.groupCoverImage
    ? req.files.groupCoverImage[0]
    : undefined;
  // console.log(Buffer.from(groupCoverImage.buffer));

  // const [groupImage, groupCoverImage] = req.files;

  const formData = new FormData();
  formData.append("files", Buffer.from(groupImage.buffer), {
    filename: groupImage.originalname,
    contentType: groupImage.mimetype
  });
  formData.append("files", Buffer.from(groupCoverImage.buffer), {
    filename: groupCoverImage.originalname,
    contentType: groupCoverImage.mimetype
  });

  try {
    const imageResponse = await axios.post(
      `${process.env.STRAPI_API}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    const data = {
      ...req.body,
      groupAdmins: JSON.parse(req.body.groupAdmins),
      groupDetails: {
        ...JSON.parse(req.body.groupDetails),
        createdOn: new Date().toISOString()
      },
      groupImage: `${process.env.STRAPI_API}${imageResponse.data[0].url}`,
      groupCoverImage: `${process.env.STRAPI_API}${imageResponse.data[1].url}`
    };

    const group = new Group(data);
    await group.save();
    res.status(200).send("group added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the group");
  }
};

const getGroupController = async (req, res) => {
  const groups = await Group.find().select(
    "groupImage groupCoverImage groupName groupMembers"
  );
  if (!groups) return res.status(404).send("No groups found");
  res.status(200).json(groups);
};

const getSpecificGroupController = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).send("No group found");
    res.status(200).json(group);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching the group");
  }
};

const getMyGroupsController = async (req, res) => {
  try {
    const groups = await Group.find({
      groupAdmins: {
        $elemMatch: {
          user: req.params.email
        }
      }
    }).select("groupImage groupCoverImage groupName groupMembers groupTags");
    if (!groups) return res.status(404).send("No groups found");
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching the groups");
  }
};

const joinGroupController = async (req, res) => {
  console.log(req.params);
  try {
    const group = await Group.findById(req.params.id);
    const user = await User.findOne({ email: req.params.email });
    if (!group) return res.status(404).send("No group found");
    const isMember = group.groupMembers.find(
      (member) => member.user === req.params.email
    );
    if (isMember) {
      console.log("already a member");
      return res.status(400).send("Already a member");
    } else {
      group.groupMembers.push({
        user: req.params.email,
        joinedOn: new Date().toISOString()
      });
      user.groups.push(req.params.id); //new and might need update
      await group.save();
      await user.save();
      console.log("joined");
      res.status(200).send("Joined group");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while joining the group");
  }
};

const exitGroupController = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id);
    const user = await User.findOne({ email: req.params.email });
    if (!group) {
      console.log("no group");
      return res.status(404).send("No group found");
    } else {
      const isMember = group.groupMembers.find(
        (member) => member.user === req.params.email
      );
      if (!isMember) {
        console.log("not a member");
        return res.status(400).send("Not a member");
      }
    }
    await Group.findByIdAndUpdate(
      { _id: req.params.id },
      { $pull: { groupMembers: { user: req.params.email } } }
    );
    await User.findByIdAndUpdate(
      { _id: user._id },
      { $pull: { groups: req.params.id } } //new and might need update
    );
    console.log("exited");
    res.status(200).send("Exited group");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while exiting the group");
  }
};

const getFollowedGroupsController = async (req, res) => {
  try {
    const followedGroups = await User.findOne({
      email: req.params.email
    }).select("groups");
    if (!followedGroups) return res.status(404).send("No groups found");

    const groups = await Group.find({
      _id: {
        $in: followedGroups.groups
      }
    }).select("groupImage groupName groupMembers");

    if (!groups || groups.length === 0) return res.status(404).send("No groups found");
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching the groups");
  }
};

const getManagedGroupsController = async (req, res) => {
  try {
    const groups = await Group.find({
      groupAdmins: {
        $elemMatch: {
          user: req.params.email
        }
      }
    }).select("groupImage groupName groupMembers groupCoverImage groupTags");
    if (!groups) return res.status(404).send("No groups found");
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching the groups");
  }
};

const addGroupPostController = async (req, res) => {
  const { description, postedBy, group } = req.body;
  const image = req.file;

  const formData = new FormData();
  formData.append("files", Buffer.from(image.buffer), {
    filename: image.originalname,
    contentType: image.mimetype
  });

  try {
    const imageResponse = await axios.post(
      `${process.env.STRAPI_API}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    const data = {
      data: {
        description,
        postedOn: new Date().toISOString(),
        image: imageResponse.data[0].id,
        likedBy: [],
        comments: [],
        postedBy,
        group
      }
    };

    const response = await axios.post(
      `${process.env.STRAPI_API}/api/group-post`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).send("group post added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the post");
  }
};

const getGroupFeedsController = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/group-post?populate=*`
    );

    const posts = response.data.data.reverse().map((post) => {
      return {
        ...post.attributes,
        id: post.id,
        image: `${process.env.STRAPI_API}${post.attributes.image.data.attributes?.url}`
      };
    });
    if (posts.length > 0) {
      res.status(200).json({ posts });
    } else {
      res.status(200).json({ posts: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
};

module.exports = {
  createGroupController,
  getGroupController,
  getSpecificGroupController,
  getMyGroupsController,
  joinGroupController,
  exitGroupController,
  getFollowedGroupsController,
  getManagedGroupsController,
  addGroupPostController,
  getGroupFeedsController
};
