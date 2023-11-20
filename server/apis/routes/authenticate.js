const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.post("/", async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
});
