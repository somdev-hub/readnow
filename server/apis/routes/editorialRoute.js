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
  getSubscribedPublisherJournalsController,
  editPublisherController,
  removeEditorController,
  addEditorController,
  editJournalController,
  deleteJournalController,
  removeSubscriberController,
  deletePublisherController,
  searchPublishersController
} = require("../controllers/editorialController");
const authenticateToken = require("../middlewares/authenticateToken");
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });
const router = express.Router();

router.post(
  "/add-publisher",
  authenticateToken,

  uploadMiddleware.fields([
    { name: "publisherImage", maxCount: 1 },
    { name: "publisherCoverImage", maxCount: 1 }
  ]),
  addPublisherController
);

router.post(
  "/edit-publisher/:publisherId",
  authenticateToken,

  uploadMiddleware.fields([
    { name: "publisherImage", maxCount: 1 },
    { name: "publisherCoverImage", maxCount: 1 }
  ]),
  editPublisherController
);

router.get(
  "/get-publishers/:email",
  authenticateToken,
  getPublishersController
);

router.get(
  "/get-managed-publishers/:publisherManager",
  authenticateToken,
  getManagedPublishersController
);

router.get(
  "/get-specific-publisher/:publisherId",
  authenticateToken,

  getSpecificPublisherController
);

router.post(
  "/toggle-subscriber",
  authenticateToken,
  toggleSubscriberController
);

router.post(
  "/add-journal",
  uploadMiddleware.single("journalCoverImage"),
  authenticateToken,

  addJournalController
);

router.post(
  "/edit-journal/:journalId",
  uploadMiddleware.single("journalCoverImage"),
  authenticateToken,

  editJournalController
);

router.post(
  "/delete-journal/:journalId",
  authenticateToken,
  deleteJournalController
);

router.post("/add-chapter", authenticateToken, addChapterController);

router.get(
  "/get-specific-journal/:journalId",
  authenticateToken,
  getSpecificJournalController
);

router.get(
  "/get-journal-comments/:journalId",
  authenticateToken,
  getJournalCommentsController
);

router.post(
  "/add-journal-comment",
  authenticateToken,
  addJournalCommentController
);

router.post(
  "/toggle-journal-like",
  authenticateToken,
  toggleJournalLikeController
);

router.post(
  "/toggle-comment-like",
  authenticateToken,
  toggleCommentLikeController
);

router.get(
  "/get-subscribed-publisher-journals/:email",
  authenticateToken,

  getSubscribedPublisherJournalsController
);

router.post(
  "/remove-editor/:publisherId",
  authenticateToken,
  removeEditorController
);

router.post("/add-editor/:publisherId", authenticateToken, addEditorController);

router.post(
  "/remove-subscriber/:publisherId",
  authenticateToken,
  removeSubscriberController
);

router.post(
  "/delete-publisher/:publisherId",
  authenticateToken,
  deletePublisherController
);

router.post(
  "/search-publishers/:email",
  authenticateToken,
  searchPublishersController
);

module.exports = router;
