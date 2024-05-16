const express = require("express");
const multer = require("multer");
const {
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
  getSubscribedPublisherJournalsController
} = require("../controllers/editorialController");
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });
const router = express.Router();

router.post(
  "/add-publisher",
  uploadMiddleware.fields([
    { name: "publisherImage", maxCount: 1 },
    { name: "publisherCoverImage", maxCount: 1 }
  ]),
  addPublisherController
);

router.get("/get-publishers/:email", getPublishersController);

router.get(
  "/get-managed-publishers/:publisherManager",
  getManagedPublishersController
);

router.get(
  "/get-specific-publisher/:publisherId",
  getSpecificPublisherController
);

router.post("/toggle-subscriber", toggleSubscriberController);

router.post(
  "/add-journal",
  uploadMiddleware.single("journalCoverImage"),
  addJournalController
);

router.post("/add-chapter", addChapterController);

router.get("/get-specific-journal/:journalId", getSpecificJournalController);

router.get("/get-journal-comments/:journalId", getJournalCommentsController);

router.post("/add-journal-comment", addJournalCommentController);

router.post("/toggle-journal-like", toggleJournalLikeController);

router.post("/toggle-comment-like", toggleCommentLikeController);

router.get(
  "/get-subscribed-publisher-journals/:email",
  getSubscribedPublisherJournalsController
);

module.exports = router;
