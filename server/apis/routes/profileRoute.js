const express = require("express");
const multer = require("multer");
const {
  addUserController,
  editProfileController,
  editProfilePictureController,
  editBackgroundPictureController,
  getProfileController,
  getShortProfileInfoController
} = require("../controllers/profileController");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/add-user", addUserController);
router.post("/edit-profile", editProfileController);
router.post(
  "/edit-profile-picture",
  upload.single("profilePicture"),
  editProfilePictureController
);
router.post(
  "/edit-background-picture",
  upload.single("backgroundPicture"),
  editBackgroundPictureController
);
router.post("/get-profile", getProfileController);
router.post("/get-short-profile-info", getShortProfileInfoController);

module.exports = router;
