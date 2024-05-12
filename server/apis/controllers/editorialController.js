const Publisher = require("../models/publishers");
const FormData = require("form-data");
const axios = require("axios");
const uploadImage = require("../utils/uploadImage");
const uploadImageAndGetId = require("../utils/uploadImageAndGetId");

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
  const { email } = req.params;
  try {
    const publishers = await Publisher.find().select(
      "publisherName publisherImage publisherCoverImage publisherCategory publisherManager publisherTags publisherSubscribers"
    );
    if (publishers.length === 0)
      return res.status(404).json("No publishers found");

    const publishersWithSubscriptionStatus = publishers.map((publisher) => {
      const { publisherSubscribers, ...otherProps } = publisher._doc;
      return {
        ...otherProps,
        subscribed: publisherSubscribers.includes(email)
      };
    });

    return res
      .status(200)
      .json({ publishers: publishersWithSubscriptionStatus });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getManagedPublishersController = async (req, res) => {
  const { publisherManager } = req.params;
  try {
    const publishers = await Publisher.find({ publisherManager }).select(
      "publisherName publisherImage publisherCoverImage publisherCategory publisherManager publisherTags "
    );

    if (publishers.length === 0) res.status(404).json("No publishers found");
    res.status(200).json({ publishers });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSpecificPublisherController = async (req, res) => {
  const { publisherId } = req.params;
  try {
    const publisher = await Publisher.findById(publisherId);
    if (!publisher) return res.status(404).json("Publisher not found");
    return res.status(200).json({ publisher });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const toggleSubscriberController = async (req, res) => {
  const { publisherId, email } = req.body;
  try {
    const publisher = await Publisher.findById(publisherId);
    if (publisher.publisherSubscribers.includes(email)) {
      await Publisher.updateOne(
        { _id: publisherId },
        { $pull: { publisherSubscribers: email } }
      );
      res.status(200).json({ message: "Unsubscribed successfully" });
    } else {
      await Publisher.updateOne(
        { _id: publisherId },
        { $addToSet: { publisherSubscribers: email } }
      );
      res.status(200).json({ message: "Subscribed successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const addJournalController = async (req, res) => {
  const {
    journalTitle,
    journalDescription,
    journalPublishingDate,
    journalEditorEmail,
    journalTags,
    publisherId
  } = req.body;
  const journalCoverImage = req.file;

  try {
    if (!journalCoverImage)
      return res
        .status(400)
        .json({ message: "Journal cover image is required" });
    const journalCoverImageId = await uploadImageAndGetId(
      journalCoverImage,
      "journal-cover-images"
    );

    const data = {
      data: {
        journalTitle,
        journalDescription,
        journalPublishingDate: new Date(journalPublishingDate).toISOString(),
        journalEditorEmail,
        journalTags: JSON.parse(journalTags),
        journalCoverImage: journalCoverImageId,
        publisherId,
        isStandAlone: false,
        journalArticle: {},
        chapters: [],
        journalComments: [],
        journalLikes: []
      }
    };

    const response = await axios.post(
      `${process.env.STRAPI_API}/api/journals`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.data && response.data.data.id) {
      return res.status(201).json({
        message: "Journal added successfully",
        id: response.data.data.id
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const addChapterController = async (req, res) => {
  const { journalId, chapter, content, isStandalone } = req.body;

  try {
    const data = {
      data: {
        chapterTitle: chapter,
        chapterContent: content
      }
    };

    const response = await axios.post(
      `${process.env.STRAPI_API}/api/chapters`,
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const journalData = await axios.get(
      `${process.env.STRAPI_API}/api/journals/${journalId}`
    );
    const journalEditResponse = await axios.put(
      `${process.env.STRAPI_API}/api/journals/${journalId}`,
      {
        data: {
          chapters: {
            connect: [response.data.data.id]
          }
        }
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    res.status(201).json({
      message: "Chapter added successfully",
      id: response.data.data.id
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addPublisherController,
  getPublishersController,
  getManagedPublishersController,
  getSpecificPublisherController,
  toggleSubscriberController,
  addJournalController,
  addChapterController
};
