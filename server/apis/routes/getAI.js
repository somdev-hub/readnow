const express = require("express");
const router = express.Router();
const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");
require("dotenv").config();
const { marked } = require("marked");

router.post("/", (req, res) => {
  const { text } = req.body;
  //   console.log(text);
  const MODEL_NAME = "models/text-bison-001";

  const client = new TextServiceClient({
    authClient: new GoogleAuth().fromAPIKey(process.env.PALM_API)
  });

  client
    .generateText({
      model: MODEL_NAME,
      prompt: {
        text: text
      }
    })
    .then((response) => {
      // const parsedContent = marked(response[0].candidates[0].output);
      // console.log(parsedContent);
      res.send(response[0].candidates[0].output);
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = router;
