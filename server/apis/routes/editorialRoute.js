const express = require("express");
const multer = require("multer");
const {
  addPublisherController,
  getPublishersController,
  getManagedPublishersController
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

router.get("/get-publishers", getPublishersController);

router.get("/get-managed-publishers/:publisherManager", getManagedPublishersController);

module.exports = router;
