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
    reactions: {
      type: Map,
      of: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
  },
  {
    timestamps: true,
  }
);

const Post = new mongoose.model('Post', postSchema);

module.exports = { Post };
