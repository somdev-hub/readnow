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
        eventDateAndTime: new Date(eventDateAndTime).toISOString(),
        eventSpeakers: JSON.parse(eventSpeakers),
        eventDescription,
        eventCover: imageResponse.data[0].id
      }
    };

    const response = await axios.post(
      `${process.env.STRAPI_API}/api/events`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log(response.data.data.id);

    // Check if the response includes the created entry's details
    if (response.data && response.data.data.id) {
      return res
        .status(200)
        .send({ message: "event added", id: response.data.data.id });
    } else {
      return res.status(400).send("Error: event not added");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while adding the post");
  }
};

const uploadEventMediaController = async (req, res) => {
  const { eventId } = req.body;
  const media = req.file;
  console.log(eventId);
  const formData = new FormData();
  formData.append("files", Buffer.from(media.buffer), {
    filename: media.originalname,
    contentType: media.mimetype
  });

  try {
    // const data=await axios.get(`${process.env.STRAPI_API}/api/events/${eventId}`)
    // console.log(data.data);
    const mediaResponse = await axios.post(
      `${process.env.STRAPI_API}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    const data = {
      data: {
        eventMedia: mediaResponse.data[0].id
      }
    };

    await axios.put(
      `${process.env.STRAPI_API}/api/events/${eventId}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    return res.status(200).send("media added");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while adding the media");
  }
};

const getSpecificEventController = async (req, res) => {
  const { eventId } = req.params;
  try {
    const data = await axios.get(
      `${process.env.STRAPI_API}/api/events/${eventId}`
    );
    console.log(data.data);
    return res.status(200).send(data.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

const getAllEventsShortInfoController = async (req, res) => {
  try {
    const data = await axios.get(`${process.env.STRAPI_API}/api/events`);
    console.log(data.data.data);
    // const eventInfo = {
    //   id: data.data.data.id,
    //   eventOrganizer: data.data.data.attributes.eventOrganizer,
    //   eventName: data.data.data.attributes.eventName,
    //   // eventMode: data.data.eventMode,
    //   eventDateAndTime: data.data.data.attributes.eventDateAndTime,
    //   // eventDescription: data.data.eventDescription,
    //   eventCover: data.data.data.attributes.eventCover
    // };
    return res.status(200).send(data.data);
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

module.exports = {
  createEventController,
  uploadEventMediaController,
  getSpecificEventController,
  getAllEventsShortInfoController
};
