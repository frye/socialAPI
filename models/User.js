const { Schema, model } = require('mongoose');
const validator = require('validator');

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
    validate: [ validator.isEmail, 'Please enter a valid email' ]
   },
   thoughts: [
     {
       type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
   friends: [{
     type: Schema.Types.ObjectId,
      ref: 'User'
   }]
});

userSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;