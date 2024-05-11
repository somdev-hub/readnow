const Publisher = require("../models/publisher");
const FormData = require("form-data");
const axios = require("axios");
const uploadImage = require("../utils/uploadImage");

const addPublisherController = async (req, res) => {
  const {
    publisherName,
    publisherManager,
    publisherCategory,
    publisherTags,
    editorEmails,
    publisherSocials,
    publisherDescription,
    publisherImage,
    publisherCoverImage
  } = req.body;

  try {
    const publisherCoverImageURL = await uploadImage(
      publisherCoverImage,
      "publisher-cover-images"
    );
    const publisherImageURL = await uploadImage(
      publisherImage,
      "publisher-images"
    );

    const newPublisher = new Publisher({
      publisherName,
      publisherManager,
      publisherCategory,
      publisherTags: JSON.parse(publisherTags),
      editorEmails: JSON.parse(editorEmails),
      publisherSocials: JSON.parse(publisherSocials),
      publisherDescription,
      publisherImage: publisherImageURL,
      publisherCoverImage: publisherCoverImageURL,
      publisherSubscribers: [],
      publisherEditorialRequests: []
    });

    await newPublisher.save();
    res.status(201).json({ message: "Publisher added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { addPublisherController };
