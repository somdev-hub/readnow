const express = require("express");
const { getPeopleController } = require("../controllers/peopleController");
const router = express.Router();

router.get("/get-people", getPeopleController);

module.exports = router;
