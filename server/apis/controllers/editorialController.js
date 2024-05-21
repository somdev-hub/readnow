const Publisher = require("../models/publishers");
const FormData = require("form-data");
const axios = require("axios");
const uploadImage = require("../utils/uploadImage");
const uploadImageAndGetId = require("../utils/uploadImageAndGetId");
const User = require("../models/user");

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
  // console.log(req.body);

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

    const publisherJournals = await axios.get(
      `${process.env.STRAPI_API}/api/journals?populate=*&filters[publisherId][$eq]=${publisherId}`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const modifiedJournalData = await publisherJournals.data.data
      .reverse()
      .map((journal) => {
        const data = {
          // ...journal.attributes,
          journalTitle: journal.attributes.journalTitle,
          journalDescription: journal.attributes.journalDescription,
          journalPublishingDate: journal.attributes.journalPublishingDate,
          journalEditorEmail: journal.attributes.journalEditorEmail,
          journalLikes: journal.attributes.journalLikes.length,
          journalComments: journal.attributes.journalComments.length,
          lastUpdated: journal.attributes.lastUpdated,
          id: journal.id,
          journalCoverImage: `${process.env.STRAPI_API}${journal.attributes?.journalCoverImage.data.attributes.url}`,
          journalPublishingDate: journal.attributes.journalPublishingDate
        };

        return data;
      });

    const publisherData = {
      publisher,
      publisherJournals: modifiedJournalData
    };

    return res.status(200).json({ publisherData });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const editPublisherController = async (req, res) => {
  const { isPublisherImageSame, isPublisherCoverImageSame } = req.body;
  const { publisherId } = req.params;
  const publisherImage = req?.files?.publisherImage[0];
  const publisherCoverImage = req?.files?.publisherCoverImage[0];

  let data = {
    publisherName: req.body.publisherName,
    publisherManager: req.body.publisherManager,
    publisherCategory: req.body.publisherCategory,
    publisherTags: JSON.parse(req.body.publisherTags),
    editorEmails: JSON.parse(req.body.editorEmails),
    publisherSocials: JSON.parse(req.body.publisherSocials),
    publisherDescription: req.body.publisherDescription
  };

  try {
    if (isPublisherCoverImageSame === "false") {
      const publisherCoverImageURL = await uploadImage(
        publisherCoverImage,
        "publisher-cover-images"
      );
      data.publisherCoverImage = publisherCoverImageURL;
    }
    if (isPublisherImageSame === "false") {
      const publisherImageURL = await uploadImage(
        publisherImage,
        "publisher-images"
      );
      data.publisherImage = publisherImageURL;
    }

    const publisher = await Publisher.findByIdAndUpdate(publisherId, data, {
      new: true
    });

    res.status(200).json({ message: "Publisher updated successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const toggleSubscriberController = async (req, res) => {
  const { publisherId, email } = req.body;
  try {
    const publisher = await Publisher.findById(publisherId);
    // const user = User.findOne({ email: email });
    if (publisher.publisherSubscribers.includes(email)) {
      await Publisher.updateOne(
        { _id: publisherId },
        { $pull: { publisherSubscribers: email } }
      );
      await User.updateOne({ email }, { $pull: { publishers: publisherId } });
      res.status(200).json({ message: "Unsubscribed successfully" });
    } else {
      await Publisher.updateOne(
        { _id: publisherId },
        { $addToSet: { publisherSubscribers: email } }
      );
      await User.updateOne(
        { email },
        { $addToSet: { publishers: publisherId } }
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
        isStandalone: false,
        journalArticle: "",
        chapters: [],
        journalComments: [],
        journalLikes: [],
        lastUpdated: new Date().toISOString()
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
    if (isStandalone) {
      const data = {
        data: {
          isStandalone: true,
          journalArticle: content,
          lastUpdated: new Date().toISOString()
        }
      };

      const response = await axios.put(
        `${process.env.STRAPI_API}/api/journals/${journalId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      return res.status(201).json({
        message: "Article added successfully"
      });
    }
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

    const journalEditResponse = await axios.put(
      `${process.env.STRAPI_API}/api/journals/${journalId}`,
      {
        data: {
          chapters: {
            connect: [response.data.data.id]
          },
          lastUpdated: new Date().toISOString()
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

const getSpecificJournalController = async (req, res) => {
  const { journalId } = req.params;
  try {
    const journal = await axios.get(
      `${process.env.STRAPI_API}/api/journals/${journalId}?populate=*`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const publisherName = await Publisher.findById(
      journal.data.data.attributes.publisherId
    ).select("publisherName");

    const data = {
      ...journal.data.data.attributes,
      id: journal.data.data.id,
      journalCoverImage: `${process.env.STRAPI_API}${journal.data.data.attributes.journalCoverImage.data.attributes.url}`,
      publisher: publisherName.publisherName,
      journalLikes: journal.data.data.attributes.journalLikes,
      journalComments: journal.data.data.attributes.journalComments.length,
      chapters: journal.data.data.attributes.chapters.data.map((chapter) => {
        return {
          id: chapter.id,
          chapterTitle: chapter.attributes.chapterTitle,
          chapterContent: chapter.attributes.chapterContent,
          createdAt: chapter.attributes.createdAt
        };
      })
    };

    return res.status(200).json({ journal: data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getJournalCommentsController = async (req, res) => {
  const { journalId } = req.params;
  try {
    const journalComments = await axios.get(
      `${process.env.STRAPI_API}/api/journals/${journalId}?fields[0]=journalComments`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return res
      .status(200)
      .json({ comments: journalComments.data.data.attributes.journalComments });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const addJournalCommentController = async (req, res) => {
  const { journalId, user, comment } = req.body;
  try {
    const commentData = await axios.get(
      `${process.env.STRAPI_API}/api/journals/${journalId}?fields[0]=journalComments`,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    const data = {
      data: {
        journalComments: [
          ...commentData.data.data.attributes.journalComments,
          {
            commentId:
              commentData.data.data.attributes.journalComments.length + 1,
            user,
            comment,
            createdAt: new Date().toISOString(),
            commentLikes: 0,
            commentLikedBy: [],
            commentReplies: []
          }
        ]
      }
    };

    const response = await axios.put(
      `${process.env.STRAPI_API}/api/journals/${journalId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(201).json({ message: "Comment added successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const toggleJournalLikeController = async (req, res) => {
  const { journalId, email } = req.body;
  try {
    // Fetch only the journalLikes field
    //.data.data.attributes.
    const journalLikes = await axios.get(
      `${process.env.STRAPI_API}/api/journals/${journalId}?fields[0]=journalLikes`
    );

    // Determine whether the email is already in the journalLikes array
    const actualJournalLikes = journalLikes.data.data.attributes.journalLikes;
    const isLiked = actualJournalLikes.includes(email);

    // Add or remove the email from the journalLikes array
    const updatedJournalLikes = isLiked
      ? actualJournalLikes.filter((like) => like !== email)
      : [...actualJournalLikes, email];

    const data = {
      data: {
        journalLikes: updatedJournalLikes
      }
    };

    // Update the journal
    await axios.put(
      `${process.env.STRAPI_API}/api/journals/${journalId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).json({
      message: "Like toggled successfully",
      journalLikes: updatedJournalLikes
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const toggleCommentLikeController = async (req, res) => {
  const { journalId, commentId, email } = req.body;
  try {
    const commentData = await axios.get(
      `${process.env.STRAPI_API}/api/journals/${journalId}?fields[0]=journalComments`
    );

    const journalComments = commentData.data.data.attributes.journalComments;
    const updatedJournalComments = journalComments.map((comment) => {
      if (comment.commentId === commentId) {
        const isLiked = comment.commentLikedBy.includes(email);
        const updatedCommentLikes = isLiked
          ? comment.commentLikedBy.filter((like) => like !== email)
          : [...comment.commentLikedBy, email];

        return {
          ...comment,
          commentLikedBy: updatedCommentLikes,
          commentLikes:
            commentData.data.data.attributes.journalComments[commentId - 1]
              .commentLikes + 1
        };
      }
      return comment;
    });

    const data = {
      data: {
        journalComments: updatedJournalComments
      }
    };

    await axios.put(
      `${process.env.STRAPI_API}/api/journals/${journalId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return res
      .status(200)
      .json({ message: "Comment like toggled successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getSubscribedPublisherJournalsController = async (req, res) => {
  const { email } = req.params;

  try {
    const subscribedPublishers = await User.findOne({ email }).select(
      "publishers"
    );
    const publisherJournals = (
      await Promise.all(
        subscribedPublishers?.publishers?.map(async (publisher, index) => {
          const {
            data: { data: journals }
          } = await axios.get(
            `${process.env.STRAPI_API}/api/journals?populate=*&filters[publisherId][$eq]=${publisher}`,
            {
              headers: {
                "Content-Type": "application/json"
              }
            }
          );
          const publisherData = await Publisher.findOne({ _id: publisher });
          const publisherName = publisherData
            ? publisherData.publisherName
            : "";
          return journals.reverse().map(({ attributes, id }) => {
            const {
              journalTitle,
              journalDescription,
              journalPublishingDate,
              journalEditorEmail,
              journalLikes,
              journalComments,
              lastUpdated,
              journalCoverImage
            } = attributes;

            return {
              journalTitle,
              journalDescription,
              journalPublishingDate,
              journalEditorEmail,
              journalLikes: journalLikes.length,
              journalComments: journalComments.length,
              lastUpdated,
              id,
              journalCoverImage: `${process.env.STRAPI_API}${journalCoverImage.data.attributes.url}`,
              publisher: publisherName
            };
          });
        })
      )
    ).flat();

    return res.status(200).json(publisherJournals);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  addPublisherController,
  getPublishersController,
  getManagedPublishersController,
  getSpecificPublisherController,
  toggleSubscriberController,
  addJournalController,
  addChapterController,
  getSpecificJournalController,
  getJournalCommentsController,
  addJournalCommentController,
  toggleJournalLikeController,
  toggleCommentLikeController,
  getSubscribedPublisherJournalsController,
  editPublisherController
};
