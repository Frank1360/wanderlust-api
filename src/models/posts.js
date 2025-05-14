const { Schema, model, Types } = require("mongoose");

const PostsSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: [
      {
        tag: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
    location: {
      latitude: { type: String, default: null },
      longitude: { type: String, default: null },
      description: { type: String, default: null, uppercase: true },
    },
     likes: [
      {
        user: {
          _id: { type: Types.ObjectId, ref: "User", required: true },
          name: String,
          last_name: String,
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = model("Post", PostsSchema); 
