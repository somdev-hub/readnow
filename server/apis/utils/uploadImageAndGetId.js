const FormData = require("form-data");
const axios = require("axios");

const uploadImageAndGetId = async (image, path) => {
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

  return imageResponse.data[0].id;
};

module.exports = uploadImageAndGetId;
