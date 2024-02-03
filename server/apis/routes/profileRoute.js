/**
 * @file profileRoute.js
 * @description Profile Route for handling profile.
 * @module Profile Route
 *
 * @requires express Express web framework for Node.js
 * @requires multer Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.
 * @requires addUserController Add User Controller for handling adding user.
 * @requires editProfileController Edit Profile Controller for handling editing profile.
 * @requires editProfilePictureController Edit Profile Picture Controller for handling editing profile picture.
 * @requires editBackgroundPictureController Edit Background Picture Controller for handling editing background picture.
 * @requires getProfileController Get Profile Controller for handling getting profile.
 * @requires getShortProfileInfoController Get Short Profile Info Controller for handling getting short profile info.
 * @requires handleFollowController Handle Follow Controller for handling following.
 *
 */

const express = require("express");
const multer = require("multer");
const {
  addUserController,
  editProfileController,
  editProfilePictureController,
  editBackgroundPictureController,
  getProfileController,
  getShortProfileInfoController,
  handleFollowController,
  getProfileGroups,
  getCardProfileInfoController
} = require("../controllers/profileController");

// multer is used for uploading files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// -------------------------- Routes -------------------------- //

// hit this route to add user
router.post("/add-user", addUserController);
// hit this route to edit profile
router.post("/edit-profile", editProfileController);
// hit this route to edit profile picture
router.post(
  "/edit-profile-picture",
  upload.single("profilePicture"),
  editProfilePictureController
);
// hit this route to edit background picture
router.post(
  "/edit-background-picture",
  upload.single("backgroundPicture"),
  editBackgroundPictureController
);
// hit this route to get profile
router.post("/get-profile", getProfileController);
// hit this route to get short profile info
router.post("/get-short-profile-info", getShortProfileInfoController);
// hit this route to follow
router.post("/follow", handleFollowController);

router.get("/get-profile-groups/:email", getProfileGroups);

router.get("/get-card-profile-info/:email", getCardProfileInfoController);

module.exports = router;
