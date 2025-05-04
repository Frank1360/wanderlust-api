const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { jwtGeneration } = require("../utils/jwt_generation");

const register = async (req = request, res = response) => {
  const { email, password, firstName, lastName, bio, phone } = req.body;

  const user = new User({
    email: email.toUpperCase(),
    password,
    firstName: firstName.toUpperCase(),
    lastName: lastName.toUpperCase(),
    bio,
    phone,
  });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  try {
    await user.save();

    res.status(200).json({
      msg: `El usuario ${firstName} ${lastName} fue creado con exito.`,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toUpperCase() });

    if (!user) {
      return res.status(400).json({
        msg: "Credenciales incorrectas. - PRUEBA: usuario no existe.",
      });
    }

    const validatePassword = bcryptjs.compareSync(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({
        msg: "Credenciales incorrectas. - PRUEBA: contraseña incorrecta.",
      });
    }

    const token = await jwtGeneration(user._id);

    res.json({
      msg: "Ingreso exitoso.",
      token,
      user: {
        iduser: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

module.exports = { register, login };
