const { Schema, model, Types } = require("mongoose");

const FavoritesSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Favorites = model("Favorites", FavoritesSchema);

module.exports = Favorites;
