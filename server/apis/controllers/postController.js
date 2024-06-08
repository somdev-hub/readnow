require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");
const uploadImageAndGetId = require("../utils/uploadImageAndGetId");

const addPostController = async (req, res) => {
  const { description, postedBy } = req.body;
  console.log(description);
  const postImage = req?.file;

  try {
    let imageId = null;
    if (postImage) {
      imageId = await uploadImageAndGetId(postImage, "posts");
    }

    const data = {
      data: {
        description,
        postedOn: new Date().toISOString(),
        image: imageId,
        likedBy: [],
        comments: [],
        postedBy
      }
    };

    const response = await axios.post(
      `${process.env.STRAPI_API}/api/posts`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).send("post added");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while adding the post");
  }
};

const getFeedsController = async (req, res) => {
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/posts?populate=*`
    );
    const posts = response.data.data.reverse().map((post) => {
      return {
        ...post.attributes,
        id: post.id,
        image:
          post?.attributes?.image?.data?.attributes?.url &&
          `${process.env.STRAPI_API}${post?.attributes?.image?.data?.attributes?.url}`
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

const likePostController = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/posts/${postId}`
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
      `${process.env.STRAPI_API}/api/posts/${postId}`,
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

const commentPostController = async (req, res) => {
  const { postId, userId, comment } = req.body;
  console.log(req.body);
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/posts/${postId}`
    );

    const post = response.data.data;
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
      `${process.env.STRAPI_API}/api/posts/${postId}`,
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

const deletePostController = async (req, res) => {
  const { postId } = req.params;
  console.log(req.body);
  try {
    const response = await axios.delete(
      `${process.env.STRAPI_API}/api/posts/${postId}`
    );

    res.status(200).send("post deleted");
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while deleting the post");
  }
};

module.exports = {
  addPostController,
  getFeedsController,
  likePostController,
  commentPostController,
  deletePostController
};
