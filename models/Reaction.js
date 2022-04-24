const { default: mongoose } = require('mongoose');
const { Schema, model } = require('mongoose');
const formatDate = require('./utils/utils');

const Reaction = new Schema({
  reactionId: {
    type: mongoose.Types.ObjectId,
    default: mongoose.Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate
  }
});