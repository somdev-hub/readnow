const Group = require("../models/groups");
const User = require("../models/user");
const FormData = require("form-data");
const axios = require("axios");

const uploadImage = async (image, path) => {
  const formData = new FormData();
  formData.append("files", Buffer.from(image.buffer), {
    filename: image.originalname,
    contentType: image.mimetype
  });

  const imageResponse = await axios.post(
    `${process.env.STRAPI_API}/api/upload`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }
  );

  return `${process.env.STRAPI_API}${imageResponse.data[0].url}`;
};

const createGroupController = async (req, res) => {
  const groupImage = req.files.groupImage ? req.files.groupImage[0] : undefined;
  const groupCoverImage = req.files.groupCoverImage
    ? req.files.groupCoverImage[0]
    : undefined;

  try {
    const imageResponse1 = await uploadImage(groupImage);
    const imageResponse2 = await uploadImage(groupCoverImage);

    const data = {
      groupName: req.body.groupName,
      groupDescription: req.body.groupDescription,
      groupRules: req.body.groupRules,
      groupTags: JSON.parse(req.body.groupTags),
      groupAdmins: JSON.parse(req.body.groupAdmins),
      groupDetails: {
        ...JSON.parse(req.body.groupDetails),
        createdOn: new Date().toISOString()
      },
      groupImage: imageResponse1,
      groupCoverImage: imageResponse2
    };

    const group = new Group(data);
    await group.save();
    res.status(200).send("group added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the group");
  }
};

const editGroupInfoController = async (req, res) => {
  const { groupId } = req.params;
  console.log(groupId);
  const { isGroupCoverSame, isGroupImageSame } = req.body;
  const groupImage = req.files.groupImage ? req.files.groupImage[0] : undefined;
  const groupCoverImage = req.files.groupCoverImage
    ? req.files.groupCoverImage[0]
    : undefined;

  let data = {
    groupName: req.body.groupName,
    groupDescription: req.body.groupDescription,
    groupAdmins: JSON.parse(req.body.groupAdmins),
    groupRules: req.body.groupRules,
    groupTags: JSON.parse(req.body.groupTags),
    groupDetails: {
      ...JSON.parse(req.body.groupDetails),
      createdOn: new Date().toISOString()
    }
  };

  try {
    if (isGroupCoverSame === "false") {
      data.groupCoverImage = await uploadImage(groupCoverImage);
    }

    if (isGroupImageSame === "false") {
      data.groupImage = await uploadImage(groupImage);
    }

    const group = await Group.findByIdAndUpdate(groupId, data, { new: true });
    res.status(200).send("group updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the group");
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

    if (!groups || groups.length === 0) return res.status(200).json([]);
    return res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    return res.status(500).send("An error occurred while fetching the groups");
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

const getShortGroupInfoController = async (req, res) => {
  try {
    const groups = await Group.findById(req.params.id).select(
      "groupImage groupName groupMembers"
    );
    if (!groups) return res.status(404).send("No groups found");
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching the groups");
  }
};

const addGroupPostController = async (req, res) => {
  const { description, postedBy, group } = req.body;
  // console.log("====================================");
  // console.log(req.body);
  // console.log("====================================");
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
    console.log(imageResponse.data[0].id);
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
      `${process.env.STRAPI_API}/api/group-posts`,
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

const getGroupPostController = async (req, res) => {
  const { postId } = req.params;
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/group-posts/${postId}?populate=*`
    );
    const post = {
      ...response.data.data.attributes,
      id: response.data.data.id,
      image: `${process.env.STRAPI_API}${response.data.data.attributes.image.data.attributes?.url}`
    };
    res.status(200).json({ post: post });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching the post");
  }
};

const getGroupFeedsController = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    console.log(groupId);
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/group-posts?populate=*&filters[group][$eq]=${groupId}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    console.log(response.data);

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

const likeGroupPostController = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/group-posts/${postId}`
    );

    const post = response.data.data;
    const likedBy = post.attributes.likedBy;
    let newLikedBy;

    if (likedBy.includes(userId)) {
      newLikedBy = likedBy.filter((id) => id !== userId);
    } else {
      newLikedBy = [...likedBy, userId];
    }

    const data = {
      data: {
        likedBy: newLikedBy
      }
    };

    const likeResponse = await axios.put(
      `${process.env.STRAPI_API}/api/group-posts/${postId}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).send("post liked/disliked");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while liking/disliking the post");
  }
};

const commentGroupPostController = async (req, res) => {
  const { postId, userId, comment } = req.body;
  console.log(req.body);
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/group-posts/${postId}`
    );

    const post = response.data.data;
    // console.log(post);
    const comments = post.attributes.comments;
    let newComments = [
      ...comments,
      {
        comment,
        commentedBy: userId,
        commentedOn: new Date().toISOString()
      }
    ];

    const data = {
      data: {
        comments: newComments
      }
    };

    const commentResponse = await axios.put(
      `${process.env.STRAPI_API}/api/group-posts/${postId}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).send("post commented");
  } catch (error) {
    // console.error(error);
    res.status(500).send("An error occurred while commenting the post");
  }
};

const addGroupAdminController = async (req, res) => {
  const { groupId } = req.params;
  const { adminMail, adminRole } = req.body;

  try {
    const groupData = await Group.findById(groupId).select("groupAdmins");

    if (!groupData) {
      return res.status(404).send("Group not found");
    } else if (
      groupData.groupAdmins.find((admin) => admin.user === adminMail)
    ) {
      return res.status(400).send("Admin already exists");
    }

    const group = await Group.findByIdAndUpdate(
      groupId,
      { $push: { groupAdmins: { user: adminMail, role: adminRole } } },
      { new: true }
    );

    res.status(200).send("group updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the group");
  }
};

const removeAdminController = async (req, res) => {
  const { groupId } = req.params;
  const { adminMail } = req.body;

  try {
    const groupData = await Group.findById(groupId).select("groupAdmins");

    if (!groupData) {
      return res.status(404).send("Group not found");
    } else if (
      !groupData.groupAdmins.find((admin) => admin.user === adminMail)
    ) {
      return res.status(400).send("Admin does not exist");
    }

    const group = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { groupAdmins: { user: adminMail } } },
      { new: true }
    );

    res.status(200).send("group updated");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the group");
  }
};

const removeMemberController = async (req, res) => {
  const { groupId } = req.params;
  const { memberMail } = req.body;

  try {
    const groupData = await Group.findById(groupId).select("groupMembers");

    if (!groupData) {
      return res.status(404).send("Group not found");
    } else if (
      !groupData.groupMembers.find((member) => member.user === memberMail)
    ) {
      return res.status(400).send("Member does not exist");
    }

    const group = await Group.findByIdAndUpdate(
      groupId,
      { $pull: { groupMembers: { user: memberMail } } },
      { new: true }
    );

    res.status(200).send("group updated");
    // const group=await
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while updating the group");
  }
};

const handleSearchGroupController = async (req, res) => {
  const { query } = req.body;
  try {
    const groups = await Group.find({
      groupName: { $regex: query, $options: "i" }
    }).select("groupImage groupCoverImage groupName groupMembers");
    if (!groups) return res.status(404).send("No groups found");
    res.status(200).json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while fetching the groups");
  }
};

module.exports = {
  createGroupController,
  editGroupInfoController,
  getGroupController,
  getSpecificGroupController,
  getMyGroupsController,
  joinGroupController,
  exitGroupController,
  getFollowedGroupsController,
  getManagedGroupsController,
  addGroupPostController,
  getGroupFeedsController,
  getShortGroupInfoController,
  likeGroupPostController,
  commentGroupPostController,
  addGroupAdminController,
  removeAdminController,
  removeMemberController,
  handleSearchGroupController,
  getGroupPostController
};
