const { request, response } = require("express");
const Post = require("../models/posts");
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
    description,
    tags,
    locationDescription,
    locationLatitude,
    locationLongitude,
  } = req.body;

  const post = new Post({
    userId: user._id,
    description,
    tags: tags.split(","),
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

    res.status(400).json({
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
    
};

const postsGet = async (req = request, res = response) => {};

module.exports = { postsPost, postsGetUser, postsGet };
