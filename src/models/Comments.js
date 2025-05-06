const { Schema, model, Types } = require("mongoose");

const CommentsSchema = new Schema(
  {
    content: {
        type: String,
        required: [true, 'Contenido obligatorio.']
    },
    postId: {
      type: Schema.Types.ObjectId,
      required: [true, 'PostId obligatorio.'],
      ref: "Posts",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, 'UserId obligatorio.'],
      ref: "User",
    },
  },
  { timestamps: true }
);

const Comments = model("Comments", CommentsSchema);

module.exports = Comments;
