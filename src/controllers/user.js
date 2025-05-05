const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");

const namePatch = async (req = request, res = response) => {
  const { _id } = req.user;
  const { firstName, lastName } = req.body;

  try {
    const result = await User.findByIdAndUpdate(_id, {
      firstName: firstName.toUpperCase(),
      lastName: lastName.toUpperCase(),
    });

    if (!result) {
      res.status(400).json({ msg: "Nombre y apellido no se ha actualizado." });
      return;
    }

    res
      .status(200)
      .json({ msg: "Nombre y apellido actualizado existosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const emailPatch = async (req = request, res = response) => {
  const { _id } = req.user;
  const { email } = req.body;

  try {
    const result = await User.findByIdAndUpdate(_id, {
      email: email.toUpperCase(),
    });

    if (!result) {
      res.status(400).json({ msg: "El correo no se ha actualizado." });
      return;
    }

    res.status(200).json({ msg: "Correo actualizado existosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const passwordPatch = async (req = request, res = response) => {
  const { _id } = req.user;
  const { password } = req.body;

  const salt = bcryptjs.genSaltSync();
  const newPassword = bcryptjs.hashSync(password, salt);

  try {
    const result = await User.findByIdAndUpdate(_id, {
      password: newPassword,
    });

    if (!result) {
      res.status(400).json({ msg: "La contraseña no se ha actualizado." });
      return;
    }

    res.status(200).json({ msg: "Contraseña actualizada existosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const phonePatch = async (req = request, res = response) => {
  const { _id } = req.user;
  const { phone } = req.body;

  try {
    const result = await User.findByIdAndUpdate(_id, {
      phone,
    });

    if (!result) {
      res.status(400).json({ msg: "El telefono no se ha actualizado." });
      return;
    }

    res.status(200).json({ msg: "Telefono actualizado existosamente." });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

module.exports = { namePatch, emailPatch, passwordPatch, phonePatch };
