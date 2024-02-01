const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EventSchema = new Schema({
  eventOrganizer: { type: String, required: true },
  eventName: { type: String, required: true },
  eventMode: {
    type: String,
    required: true,
    enum: ["video", "audio", "hybrid"]
  },
  eventDateAndTime: { type: Date, required: true },
  eventSpeakers: { type: Array, required: true },
  eventDescription: { type: String, required: true },
  eventCover: { type: String },
  eventAttendees: { type: Array },
  eventMedia: { type: Array },
  eventLink: { type: String },
  eventLikes: { type: Array },
  eventComments: { type: Array }
});

const Event = mongoose.model("Event", EventSchema);

module.exports = Event;
