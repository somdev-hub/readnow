const express = require("express");
const router = express.Router();
const multer = require("multer");
const { createEventController } = require("../controllers/eventController");
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

router.post(
  "/create-event",
  uploadMiddleware.single("eventCover"),
  createEventController
);

module.exports = router;
