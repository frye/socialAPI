const { Schema, model } = require('mongoose');
const thoughtsSchema = require('./Thoughts');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trimmed: true
  },
  email: { 
    type: String,
    required: true,
    unique: true,
    validate: [ isEmail, 'Please enter a valid email' ]
   },
   thoughts: [thoughtsSchema],
   friends: [userSchema]
})

const User = model(user, userSchema);

module.exports = User;