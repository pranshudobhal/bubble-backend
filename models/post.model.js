const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    username: {
      type: String,
      ref: 'User',
      required: [true, 'username cannot be empty'],
    },
    content: {
      type: String,
      required: [true, 'post content cannot be empty'],
    },
  },
  {
    timestamps: true,
  }
);

const Post = new mongoose.model('Post', postSchema);

module.exports = {};
