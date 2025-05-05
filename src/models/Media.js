const { Schema, model, Types } = require("mongoose");

const MediaSchema = new Schema(
  {
    type: {
      type: String,
      required: [true, "Tipo requerido."],
    },
    url: {
      type: String,
      required: [true, "Enlace requerido."],
    },
    thumbnail: {
      type: String,
      required: "Vista previa requerida.",
    },
    description: {
      type: String,
    },
    postId: {
      type: Schema.Types.ObjectId,
      ref: "Posts",
    },
  },
  { timestamps: true }
);

const Media = model("Media", MediaSchema);

module.exports = Media;
