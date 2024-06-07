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
  getCardProfileInfoController,
  getUserFollowersController,
  toggleOtherEmailsController,
  setPrimaryEmailController,
  changePasswordController,
  addStoryController,
  getMyStoriesController,
  getFollowingStoriesController,
  addStoryViewCountController,
  getAllStroiesController
} = require("../controllers/profileController");
const authenticateToken = require("../middlewares/authenticateToken");

// multer is used for uploading files
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const router = express.Router();

// -------------------------- Routes -------------------------- //

// hit this route to add user
router.post("/add-user", addUserController);
// hit this route to edit profile
router.post(
  "/edit-profile/:email",
  authenticateToken,
  upload.fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "backgroundPicture", maxCount: 1 }
  ]),
  editProfileController
);
// hit this route to edit profile picture
router.post(
  "/edit-profile-picture",
  authenticateToken,
  upload.single("profilePicture"),
  editProfilePictureController
);
// hit this route to edit background picture
router.post(
  "/edit-background-picture",
  authenticateToken,
  upload.single("backgroundPicture"),
  editBackgroundPictureController
);
// hit this route to get profile
router.get("/get-profile/:email", authenticateToken, getProfileController);
// hit this route to get short profile info
router.post(
  "/get-short-profile-info",
  authenticateToken,
  getShortProfileInfoController
);
// hit this route to follow
router.post("/follow", authenticateToken, handleFollowController);

router.get("/get-profile-groups/:email", authenticateToken, getProfileGroups);

router.get(
  "/get-card-profile-info/:email",
  authenticateToken,
  getCardProfileInfoController
);

router.get(
  "/get-user-followers/:email",
  authenticateToken,
  getUserFollowersController
);

router.post(
  "/toggle-other-email/:email",
  authenticateToken,
  toggleOtherEmailsController
);

router.post(
  "/set-primary-email/:email",
  authenticateToken,
  setPrimaryEmailController
);

router.post(
  "/change-password/:email",
  authenticateToken,
  changePasswordController
);

router.post(
  "/add-story/:email",
  authenticateToken,
  upload.single("story"),
  addStoryController
);

router.get("/get-my-stories/:email", authenticateToken, getMyStoriesController);

router.get(
  "/get-following-stories/:email",
  authenticateToken,
  getFollowingStoriesController
);

router.post(
  "/add-story-view/:email",
  authenticateToken,
  addStoryViewCountController
);

router.get(
  "/get-all-stories/:email",
  authenticateToken,
  getAllStroiesController
);

module.exports = router;
