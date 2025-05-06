const { request, response } = require("express");
const Favorites = require("../models/favorites");

const favoritesPost = async (req = request, res = response) => {
  const { _id } = req.user;
  const { postId } = req.query;

  try {
    const favoriteExist = await Favorites.find({
      postId,
      userId: _id,
    });

    if (favoriteExist.length > 0) {
      res.status(400).json({
        msg: "Ya tienes esta publicación en favoritos",
      });
      return;
    }

    const favorite = new Favorites({ postId, userId: _id });

    const result = await favorite.save();

    if (!result) {
      res.status(400).json({ msg: "No se ha podio guardar en favoritos." });
      return;
    }

    res.status(200).json({
      msg: "Se ha añadido esta publicacion a favoritos.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const favoritesGet = async (req = request, res = response) => {
  const { _id } = req.user;

  try {
    const favorites = await Favorites.find({ userId: _id });

    res.status(200).json({
      favorites,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

module.exports = { favoritesPost, favoritesGet };
