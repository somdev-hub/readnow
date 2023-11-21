const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { token } = req.body;
  //   console.log(token);
  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.log(err);
        res.send({
          status: 500,
          message: err
        });
      } else {
        res.send({
          status: 200,
          message: "User decoded successfully",
          data: decoded
        });
      }
    });
  } catch (error) {
    return res.send({
      status: 500,
      message: "Server error"
    });
  }
});

module.exports = router;
