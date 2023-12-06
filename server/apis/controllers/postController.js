require("dotenv").config();
const axios = require("axios");
const FormData = require("form-data");

const addPostController = async (req, res) => {
  const { description, postedBy } = req.body;
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
        image: `http://192.168.39.254:1337${post.attributes.image.data.attributes?.url}`
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
  // console.log(req.body);
  try {
    const response = await axios.get(
      `${process.env.STRAPI_API}/api/posts/${postId}`
    );

    const post = response.data.data;
    // console.log(post);
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

module.exports = { addPostController, getFeedsController, likePostController };
