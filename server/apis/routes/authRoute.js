const express = require("express");
const {
  authenticationController,
  decodeUserController
} = require("../controllers/authController");

const router = express.Router();

router.post("/authenticate", authenticationController);
router.post("/decode", decodeUserController);

module.exports = router;
