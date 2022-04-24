const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction');

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: formatDate
  }
});

function formatDate(createdAt) {
  const date = new Date(createdAt);
  const dateString = date.toDateString();
  const timeString = date.toLocaleTimeString();
  return `${dateString} ${timeString}`;
}

const Thought = model('thought', thoughtSchema);

module.exports = Thought;