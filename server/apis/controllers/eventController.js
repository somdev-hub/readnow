const User = require("../models/user");
const Event = require("../models/events");
const FormData = require("form-data");
const axios = require("axios");

const createEventController = async (req, res) => {
  const {
    eventOrganizer,
    eventName,
    eventMode,
    eventDateAndTime,
    eventSpeakers,
    eventDescription
  } = req.body;
  const eventCover = req.file;

  const formData = new FormData();
  formData.append("files", Buffer.from(eventCover.buffer), {
    filename: eventCover.originalname,
    contentType: eventCover.mimetype
  });

  try {
    const imageResponse = await axios.post(
      `${process.env.STRAPI_API}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    console.log(imageResponse.data[0].id);
    const date = new Date(eventDateAndTime);
    console.log(date.toLocaleDateString());
    console.log(date.toLocaleTimeString());
    const data = {
      data: {
        eventOrganizer,
        eventName,
        eventMode,
        eventDataAndTime: new Date(eventDateAndTime).toISOString(),
        eventSpeakers,
        eventDescription,
        eventCover: imageResponse.data[0].id
      }
    };

    await axios.post(
      `${process.env.STRAPI_API}/api/events`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
    return res.status(200).send("event added");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while adding the post");
  }
};

module.exports = {
  createEventController
};
