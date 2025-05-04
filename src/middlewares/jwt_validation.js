const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");


const jwtValidation = async (req = request, res = response, next) => {
  token = req.header("wanderlust_token");

  if (!token) {
    return res.status(401).json({ msg: "La petición no posee token." });
  }

  try {
    const { id } = jwt.verify(token, process.env.SECRETKEY);

    const user = await User.findById(id);

    if (!user) {
      return res.status(402).json({ msg: "Token no es valido." });
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(500).json({
      error,
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};
