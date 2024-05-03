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
        eventCover: imageResponse.data[0].id,
        eventAttendees: [],
        eventComments: []
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

const editEventController = async (req, res) => {
  const { eventId } = req.params;
  const { isEventCoverSame } = req.body;
  const {
    eventOrganizer,
    eventName,
    eventMode,
    eventDateAndTime,
    eventSpeakers,
    eventDescription
    // eventCover
  } = req.body;
  const eventCover = req.file;
  // console.log(typeof isEventCoverSame);
  let data = {};

  if (isEventCoverSame === "false") {
    const formData = new FormData();
    formData.append("files", Buffer.from(eventCover.buffer), {
      filename: eventCover.originalname,
      contentType: eventCover.mimetype
    });

    const imageResponse = await axios.post(
      `${process.env.STRAPI_API}/api/upload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    data = {
      data: {
        eventOrganizer,
        eventName,
        eventMode,
        eventDateAndTime,
        eventSpeakers: JSON.parse(eventSpeakers),
        eventDescription,
        eventCover: imageResponse.data[0].id
      }
    };
    console.log("image updated");
  } else {
    // console.log(isEventCoverSame);
    data = {
      data: {
        eventOrganizer,
        eventName,
        eventMode,
        eventDateAndTime,
        eventSpeakers: JSON.parse(eventSpeakers),
        eventDescription
        // eventCover
      }
    };
    console.log("image not updated");
  }
  try {
    const response = await axios.put(
      `${process.env.STRAPI_API}/api/events/${eventId}`,
      JSON.stringify(data),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("event edited");
    return res
      .status(200)
      .send({ message: "event updated", id: response.data.data.id });
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while updating the event");
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
      `${process.env.STRAPI_API}/api/events/${eventId}?populate=*`
    );
    // console.log(data.data);
    const eventData = {
      id: data.data.data.id,
      ...data.data.data.attributes,
      eventCover: `${process.env.STRAPI_API}${data.data.data.attributes.eventCover.data.attributes?.url}`,
      eventMedia:
        data.data.data.attributes.eventMedia?.data &&
        `${process.env.STRAPI_API}${data.data.data.attributes.eventMedia?.data?.attributes?.url}`
    };
    return res.status(200).send(eventData);
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

const getAllEventsShortInfoController = async (req, res) => {
  try {
    const data = await axios.get(
      `${process.env.STRAPI_API}/api/events?populate=*`
    );
    const eventInfoPromises = data.data.data.map(async (event) => {
      return {
        id: event.id,
        eventOrganizer: event.attributes.eventOrganizer,
        eventName: event.attributes.eventName,
        eventDateAndTime: event.attributes.eventDateAndTime,
        eventCover: `${process.env.STRAPI_API}${event.attributes.eventCover.data.attributes?.url}`,
        eventAttendees: event.attributes.eventAttendees
      };
    });

    const eventInfo = await Promise.all(eventInfoPromises);

    return res.status(200).send(eventInfo);
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

const toggleEventAttendenceController = async (req, res) => {
  const { eventId, email } = req.body;
  try {
    const getEventResponse = await axios.get(
      `${process.env.STRAPI_API}/api/events/${eventId}`
    );
    const currentAttendees =
      getEventResponse.data.data.attributes.eventAttendees || [];

    let updatedAttendees;
    if (currentAttendees.includes(email)) {
      updatedAttendees = currentAttendees.filter(
        (attendee) => attendee !== email
      );
      await axios.put(
        `${process.env.STRAPI_API}/api/events/${eventId}`,
        JSON.stringify({ data: { eventAttendees: updatedAttendees } }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return res.status(200).send("attendee removed");
    } else {
      updatedAttendees = [...currentAttendees, email];
      await axios.put(
        `${process.env.STRAPI_API}/api/events/${eventId}`,
        JSON.stringify({ data: { eventAttendees: updatedAttendees } }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
      return res.status(200).send("attendee added");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send("internal server error");
  }
};

module.exports = {
  createEventController,
  editEventController,
  uploadEventMediaController,
  getSpecificEventController,
  getAllEventsShortInfoController,
  toggleEventAttendenceController
};
