const { Schema, model, Types } = require("mongoose");

const PostSchema = new Schema(
  {
    description: {
      type: String,
    },
    tags: {
      type: Array,
    },
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

const Post = model("Post", PostSchema);

module.exports = Post;
