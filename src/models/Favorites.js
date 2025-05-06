const { Schema, model, Types } = require("mongoose");

const FavoritesSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      required: [true, "El id del post es requerido."],
      ref: "Posts",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "El id del usuario es requerido."],
      ref: "User",
    },
  },
  { timestamps: true }
);

const Favorites = model("Favorites", FavoritesSchema);

module.exports = Favorites;
