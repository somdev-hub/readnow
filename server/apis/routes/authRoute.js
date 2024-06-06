/**
 * @file: authRoute.js
 * @description: Authentication Route for handling authentication.
 * @module: Authentication Route
 *
 * @requires express Express web framework for Node.js
 * @requires authenticationController Authentication Controller for handling authentication.
 * @requires decodeUserController Decode User Controller for handling decoding of user.
 *
 */

const express = require("express");
const {
  authenticationController,
  decodeUserController,
  refreshAuthenticationController
} = require("../controllers/authController");

const router = express.Router();

// -------------------------- Routes -------------------------- //
// hit this route to authenticate user while login
router.post("/authenticate", authenticationController);
// hit this route to decode user every time user visits the app
router.post("/refresh", refreshAuthenticationController);
router.post("/decode", decodeUserController);

module.exports = router;
