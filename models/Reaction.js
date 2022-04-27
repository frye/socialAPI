const { Schema, Types } = require('mongoose');
const formatDate = require('../utils/utils');

const Reaction = new Schema({
  reactionId: {
    type: Types.ObjectId,
    default: new Types.ObjectId()
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
    get: (createdAtVal) => formatDate(createdAtVal)
  }
},
{
  toJSON: {
    getters: true
  }
}
);

module.exports = Reaction;