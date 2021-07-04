const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      required: [true, 'userID cannot be empty'],
      ref: 'User',
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

module.exports = { Post };
