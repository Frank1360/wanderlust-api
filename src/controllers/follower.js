const { request, response } = require("express");
const Followers = require("../models/followers");

const followPost = async (req = request, res = response) => {
  const { _id } = req.user;
  const { userId } = req.query;

  try {
    const followExist = await Followers.find({
      followerId: _id,
      followingId: userId,
    });

    if (followExist.length > 0) {
      res.status(400).json({
        msg: "Ya sigues a este usuario",
      });
      return;
    }

    const follower = new Followers({ followerId: _id, followingId: userId });

    const result = await follower.save();

    if (!result) {
      res.status(400).json({ msg: "No se ha podio seguir al usuario." });
      return;
    }

    res.status(200).json({
      msg: "Se ha añadido esta cuenta a tus seguidos.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const followingsGet = async (req = request, res = response) => {
  const { _id } = req.user;

  try {
    const followings = await Followers.find({ followerId: _id });

    res.status(200).json({
      followings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const followersGet = async (req = request, res = response) => {
  const { _id } = req.user;

  try {
    const followers = await Followers.find({ followingId: _id });

    res.status(200).json({
      followers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const followingsGetByUser = async (req = request, res = response) => {
  const { _id } = req.query;

  try {
    const followings = await Followers.find({ followerId: _id });

    res.status(200).json({
      followings,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const followersGetByUser = async (req = request, res = response) => {
  const { _id } = req.query;

  try {
    const followers = await Followers.find({ followingId: _id });

    res.status(200).json({
        followers,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

module.exports = {
  followPost,
  followingsGet,
  followersGet,
  followingsGetByUser,
  followersGetByUser,
};
