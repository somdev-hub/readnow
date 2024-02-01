
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  groupName: { type: String, required: true },
  groupDescription: { type: String, required: true },
  groupMembers: { type: Array, },
  groupAdmins: { type: Array, required: true, unique: true },
  groupPosts: { type: Array },
  groupImage: { type: String },
  groupCoverImage: { type: String },
  groupDetails: {
    groupLocation: { type: String, required: true },
    groupWebsite: { type: String },
    groupVisibility: {
      type: String,
      required: true,
      enum: ["public", "private"]
    },
    groupGenre: { type: Array, required: true },
    createdOn: { type: Date, default: Date.now }
  },
  groupRequests: { type: Array },
  groupRules: { type: String, required: true },
  groupTags: { type: Array, required: true },
  membershipRequests: { type: Array },
  postsRequests: { type: Array }
});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;
