const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const uploadMiddleware = multer({ storage });
const {
  createGroupController,
  getGroupController,
  getMyGroupsController,
  getSpecificGroupController,
  joinGroupController,
  exitGroupController,
  getFollowedGroupsController,
  getManagedGroupsController,
  addGroupPostController,
  getGroupFeedsController,
  getShortGroupInfoController,
  likeGroupPostController,
  commentGroupPostController,
  editGroupInfoController,
  addGroupAdminController,
  removeAdminController,
  removeMemberController,
  handleSearchGroupController
} = require("../controllers/groupController");
const authenticateToken = require("../middlewares/authenticateToken");

router.post(
  "/create-group",
  authenticateToken,
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

router.post(
  "/edit-group/:groupId",
  authenticateToken,
  uploadMiddleware.fields([
    { name: "groupImage", maxCount: 1 },
    { name: "groupCoverImage", maxCount: 1 }
  ]),
  editGroupInfoController
);

router.get("/get-groups", authenticateToken, getGroupController);

router.get("/get-my-groups/:email", authenticateToken, getMyGroupsController);

router.get(
  "/get-specific-group/:id",
  authenticateToken,
  getSpecificGroupController
);

router.get("/join-group/:id/:email", authenticateToken, joinGroupController);

router.get("/exit-group/:id/:email", authenticateToken, exitGroupController);

router.get(
  "/get-followed-groups/:email",
  authenticateToken,
  getFollowedGroupsController
);

router.get(
  "/get-managed-groups/:email",
  authenticateToken,
  getManagedGroupsController
);

router.post(
  "/add-group-post",
  authenticateToken,
  uploadMiddleware.single("image"),
  addGroupPostController
);

router.get(
  "/get-group-feeds/:groupId",
  authenticateToken,
  getGroupFeedsController
);

router.get(
  "/get-short-group-info/:id",
  authenticateToken,
  getShortGroupInfoController
);

router.post("/like-group-post", authenticateToken, likeGroupPostController);

router.post(
  "/comment-group-post",
  authenticateToken,
  commentGroupPostController
);

router.post("/add-admin/:groupId", authenticateToken, addGroupAdminController);

router.post("/remove-admin/:groupId", authenticateToken, removeAdminController);

router.post(
  "/remove-member/:groupId",
  authenticateToken,
  removeMemberController
);

router.post("/search-groups", authenticateToken, handleSearchGroupController);

module.exports = router;
