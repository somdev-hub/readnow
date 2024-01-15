const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  createGroupController,
  getGroupController,
  getMyGroupsController,
  getSpecificGroupController,
  joinGroupController,
  exitGroupController,
  getFollowedGroupsController,
  getManagedGroupsController
} = require("../controllers/groupController");
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });

router.post(
  "/create-group",
  uploadMiddleware.fields([
    { name: "groupImage", maxCount: 1 },
    { name: "groupCoverImage", maxCount: 1 }
  ]),

  createGroupController,
  (error, req, res, next) => {
    console.log(error); // Log any errors
    res.status(500).json({ error: error.toString() });
  }
);

router.get("/get-groups", getGroupController);

router.get("/get-my-groups/:email", getMyGroupsController);

router.get("/get-specific-group/:id", getSpecificGroupController);

router.get("/join-group/:id/:email", joinGroupController);

router.get("/exit-group/:id/:email", exitGroupController);

router.get("/get-followed-groups/:email", getFollowedGroupsController);

router.get("/get-managed-groups/:email", getManagedGroupsController);

module.exports = router;
