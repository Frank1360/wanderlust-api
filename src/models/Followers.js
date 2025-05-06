const { Schema, model, Types } = require("mongoose");

const FollowersSchema = new Schema(
  {
    followerId: {
      type: Schema.Types.ObjectId,
      required: [true, "El id del seguidor (usuario) es requerido."],
      ref: "User",
    },
    followingId: {
        type: Schema.Types.ObjectId,
        required: [true, "El id del seguido (usuario) es requerido."],
        ref: "User",
      },
  },
  { timestamps: true }
);

const Followers = model("Followers", FollowersSchema);

module.exports = Followers;
