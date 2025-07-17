const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  freindRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  friends: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  sentFriendRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  chatMetadata: [
    {
      participantId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      unreadCount: { type: Number, default: 0 },
      lastSeen: { type: Date, default: null }
    }
  ],


});


const User = mongoose.model("User", userSchema);

module.exports = User