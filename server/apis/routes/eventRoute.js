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
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

router.post(
  "/create-event",
  uploadMiddleware.single("eventCover"),
  createEventController
);

router.post(
  "/edit-event/:eventId",
  uploadMiddleware.single("eventCover"),
  editEventController
);

router.post(
  "/upload-media",
  uploadMiddleware.single("eventMedia"),
  uploadEventMediaController
);

router.get("/get-specific-event/:eventId", getSpecificEventController);

router.get("/get-all-short-event-info", getAllEventsShortInfoController);

router.post("/toggle-event-attendence", toggleEventAttendenceController);

module.exports = router;
