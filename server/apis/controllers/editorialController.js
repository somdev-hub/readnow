const Publisher = require("../models/publishers");
const FormData = require("form-data");
const axios = require("axios");
const uploadImage = require("../utils/uploadImage");

const addPublisherController = async (req, res) => {
  console.log("hello");
  const {
    publisherName,
    publisherManager,
    publisherCategory,
    publisherTags,
    editorEmails,
    publisherSocials,
    publisherDescription
  } = req.body;
  const publisherImage = req.files.publisherImage[0];
  const publisherCoverImage = req.files.publisherCoverImage[0];
  console.log(req.body);

  try {
    let publisherImageURL = "";
    let publisherCoverImageURL = "";
    if (publisherCoverImage) {
      publisherCoverImageURL = await uploadImage(
        publisherCoverImage,
        "publisher-cover-images"
      );
    } else {
      publisherCoverImageURL = "";
    }
    if (!publisherImage) {
      publisherImageURL = await uploadImage(publisherImage, "publisher-images");
    } else {
      publisherImageURL = "";
    }

    const data = {
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
    };

    const newPublisher = new Publisher(data);

    await newPublisher.save();
    res.status(201).json({ message: "Publisher added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getPublishersController = async (req, res) => {
  try {
    const publishers = await Publisher.find().select(
      "publisherName publisherImage publisherCoverImage publisherCategory publisherManager publisherTags"
    );
    if (publishers.length === 0) res.status(404).json("No publishers found");
    res.status(200).json({ publishers });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getManagedPublishersController = async (req, res) => {
  const { publisherManager } = req.params;
  try {
    const publishers = await Publisher.find({ publisherManager }).select(
      "publisherName publisherImage publisherCoverImage publisherCategory publisherManager publisherTags"
    );
    if (publishers.length === 0) res.status(404).json("No publishers found");
    res.status(200).json({ publishers });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addPublisherController,
  getPublishersController,
  getManagedPublishersController
};
