const { Schema, model, Types } = require("mongoose");

const FollowersSchema = new Schema(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    followingId: {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
  },
  { timestamps: true }
);

const Followers = model("Followers", FollowersSchema);

module.exports = Followers;
