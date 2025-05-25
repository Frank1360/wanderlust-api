const { request, response } = require("express");
const Post = require("../models/posts");//cambio  
const Media = require("../models/media");
const cloudinary = require("../utils/cloudinary");

const postsPost = async (req = request, res = response) => {
  const user = req.user;

  let image = null;

  if (req.files) {
    if (req.files.image) {
      const { tempFilePath } = req.files.image;
      image = tempFilePath;
    }
  }

  const {
    title,
    description,
    tags,
    locationDescription,
    locationLatitude,
    locationLongitude,
  } = req.body;

 const parsedTags = typeof tags === "string"
  ? tags.split(",").map((tag) => ({ tag: tag.trim() }))
  : [];

const post = new Post({
  userId: user._id,
  title,
  description,
  tags: parsedTags,
});

  if (locationLatitude) {
    post.location.latitude = locationLatitude;
    post.location.longitude = locationLongitude;
    post.location.description = locationDescription.toUpperCase();
  }

  try {
    if (image) {
      const { url, format, public_id } = await cloudinary.uploader.upload(
        image
      );

      const thumbnail = `https://res.cloudinary.com/${process.env.CLOUDINARY_NAME}/image/upload/c_thumb,w_200,g_face/v1744501810/${public_id}.${format}`;

      const postCreated = await post.save();

      if (!postCreated) {
        res.status(400).json({
          msg: "El post no se ha publicado..",
        });
        return;
      }

      const media = new Media({
        postId: postCreated._id,
        type: format,
        url,
        thumbnail,
        description: "publication image",
      });

      const mediaCreated = await media.save();

      if (!mediaCreated) {
        await Post.findOneAndDelete({ _id: postCreated._id });

        res.status(400).json({
          msg: "El post no se ha publicado..",
        });
        return;
      }
    } else {
      const postCreated = await post.save();

      if (!postCreated) {
        res.status(400).json({
          msg: "El post no se ha publicado..",
        });
        return;
      }
    }

    res.status(200).json({
      msg: "El post se ha creado correctamente.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const postsGetUser = async (req = request, res = response) => {
  const user = req.user;

  try {
    const posts = await Post.find({ userId: user._id }).populate("userId", "username");

    res.status(200).json({posts})
  } catch {
    console.error(error);

    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const postsGet = async (req = request, res = response) => {
  try {
    const posts = await Post.find()
      .populate("userId", "username")
      .sort({ createdAt: -1 });
    console.log("✅ Posts encontrados:", posts.length);
    const media = await Media.find();

    const newPosts = posts.map((post) => {
      const postMedia = media.filter(
        (m) => post._id.toString() === m.postId.toString()
      );

      return {
        post,
        media: postMedia,
      };
    });

    res.status(200).json({ posts: newPosts });
  } catch (error) {
    console.error("❌ Error en postsGet:", error);
    res.status(500).json({ msg: "Error al obtener publicaciones." });
  }
};
module.exports = { postsPost, postsGetUser, postsGet };