const { Schema, model, Types } = require("mongoose");

const CommentsSchema = new Schema(
  {
    content: {
        type: String,
        required: [true, 'Contenido obligatorio.']
    },
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
//cambio
const Comments = model("Comments", CommentsSchema);

module.exports = Comments;
