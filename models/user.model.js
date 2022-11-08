const mongoose = require('mongoose');
require('mongoose-type-email');
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First Name cannot be empty'],
    },
    lastName: {
      type: String,
    },
    username: {
      type: String,
      required: [true, 'Username cannot be empty'],
      unique: true,
    },
    email: {
      type: mongoose.SchemaTypes.Email,
      required: [true, 'Email cannot be empty'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password cannot be empty'],
    },
    profileImageURL: {
      type: String,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

module.exports = { User };
