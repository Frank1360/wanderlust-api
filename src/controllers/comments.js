const Comments = require("../models/Comments");

const commentPost = async (req = request, res = response) => {
  const { _id } = req.user;
  const { postId } = req.query;
  const { content } = req.body;

  try {
    const comment = new Comments({ content, postId, userId: _id });

    const result = await comment.save();

    if (!result) {
      res.status(400).json({ msg: "No se ha podio publicar el comentario." });
      return;
    }

    res.status(200).json({
      msg: "Se ha publicado el comentario.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const commentGet = async (req = request, res = response) => {
  const { postId } = req.query;

  try {
    const comments = await Comments.find({ postId });

    res.status(200).json({
      comments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

module.exports = { commentPost, commentGet };
