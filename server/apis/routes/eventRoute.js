const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createEventController,
  uploadEventMediaController,
  getSpecificEventController,
  getAllEventsShortInfoController,
  toggleEventAttendenceController,
  editEventController
} = require("../controllers/eventController");
const authenticateToken = require("../middlewares/authenticateToken");
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

router.post(
  "/create-event",
  authenticateToken,
  uploadMiddleware.single("eventCover"),
  createEventController
);

router.post(
  "/edit-event/:eventId",
  authenticateToken,
  uploadMiddleware.single("eventCover"),
  editEventController
);

router.post(
  "/upload-media",
  authenticateToken,
  uploadMiddleware.single("eventMedia"),
  uploadEventMediaController
);

router.get(
  "/get-specific-event/:eventId",
  authenticateToken,
  getSpecificEventController
);

router.get(
  "/get-all-short-event-info",
  authenticateToken,
  getAllEventsShortInfoController
);

router.post(
  "/toggle-event-attendence",
  authenticateToken,
  toggleEventAttendenceController
);

module.exports = router;
