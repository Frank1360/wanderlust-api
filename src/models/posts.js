const { Schema, model, Types } = require("mongoose");

const PostsSchema = new Schema(
  {
    description: {
      type: String,
    },
    tags: [
      {
        tag: {
          type: String,
        },
      },
    ],
    location: {
      latitude: { type: String, default: null },
      longitude: { type: String, default: null },
      description: { type: String, default: null },
    },
    likes: {
      user: {
        _id: Types.ObjectId,
        name: String,
        last_name: String,
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Posts = model("Posts", PostsSchema);

module.exports = Posts;
