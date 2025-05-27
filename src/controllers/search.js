const User = require("../models/user");
const Post = require("../models/posts");

const globalSearch = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ msg: "La búsqueda no puede estar vacía." });
  }

  const searchRegex = new RegExp(query, "i"); // búsqueda insensible a mayúsculas

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: searchRegex } },
        { firstName: { $regex: searchRegex } },
        { lastName: { $regex: searchRegex } },
        { bio: { $regex: searchRegex } },
        { "interests.interest": { $regex: searchRegex } },
      ],
    }).select("username profilePicture firstName lastName bio");

    const posts = await Post.find({
      $or: [
        { title: { $regex: searchRegex } },
        { description: { $regex: searchRegex } },
        { "tags.tag": { $regex: searchRegex } },
      ],
    })
      .populate("userId", "username profilePicture")
      .sort({ createdAt: -1 });

     const media = await require("../models/media").find();

      const postsWithMedia = posts.map((post) => {
      const postMedia = media.filter(
        (m) => m.postId.toString() === post._id.toString()
      );

      return {
        post,
        media: postMedia,
      };
    });


   res.status(200).json({ users, posts: postsWithMedia });
  } catch (error) {
    console.error("❌ Error en búsqueda:", error);
    res.status(500).json({ msg: "Error al realizar la búsqueda." });
  }
};

module.exports = { globalSearch };