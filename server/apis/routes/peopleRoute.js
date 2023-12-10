/**
 * @file peopleRoute.js
 * @description People Route for handling people.
 * @module People Route
 * 
 * @requires express Express web framework for Node.js
 * @requires getPeopleController Get People Controller for handling getting people.
 * 
 * @routes {GET} /get-people Route for getting people.
 */

const express = require("express");
const { getPeopleController } = require("../controllers/peopleController");
const router = express.Router();

// -------------------------- Routes -------------------------- //

// hit this route to get people
router.get("/get-people", getPeopleController);

module.exports = router;
