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
      ref: "user",
    },
  },
  { timestamps: true }
);

const User = model("User", UserSchema);

module.exports = User;
