const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PublisherSchema = new Schema({
  publisherName: { type: String, required: true },
  publisherManager: { type: String, required: true },
  publisherCategory: { type: String, required: true },
  publisherTags: { type: Array, required: true },
  editorEmails: { type: Array, required: true },
  publisherSocials: {
    twitter: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    website: { type: String }
  },
  publisherDescription: { type: String, required: true },
  publisherImage: { type: String },
  publisherCoverImage: { type: String },
  publisherSubscribers: { type: Array },
  publisherEditorialRequests: { type: Array },
  createdOn: { type: Date, default: Date.now }
});

const Publisher = mongoose.model("Publisher", PublisherSchema);

module.exports = Publisher;
