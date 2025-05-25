const { request, response } = require("express");
const bcryptjs = require("bcryptjs");
const User = require("../models/user");
const { jwtGeneration } = require("../utils/jwt_generation");

const register = async (req = request, res = response) => {
  const { email, password, firstName, lastName, birthday, bio, phone, username } = req.body;

  // Validación de campos obligatorios
  if (!username) {
    return res.status(400).json({ msg: "El nombre de usuario es obligatorio." });
  }

  const user = new User({
    email: email.toUpperCase(),
    password,
    firstName: firstName.toUpperCase(),
    lastName: lastName.toUpperCase(),
    birthday,
    bio,
    phone,
    username,
  });

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  try {
    await user.save();

    res.status(200).json({
      msg: `El usuario ${firstName} ${lastName} fue creado con éxito.`,
    });

  } catch (error) {
    // 🔍 Validación de campos únicos repetidos (email, username)
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue)[0];

      let message = "Ya existe un usuario con ese dato.";
      if (duplicatedField === "email") message = "El correo ya está registrado.";
      if (duplicatedField === "username") message = "El nombre de usuario ya está en uso.";

      return res.status(400).json({ msg: message });
    }

    console.error("Error en registro:", error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

// -------------------- LOGIN --------------------
const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email.toUpperCase() });

    if (!user) {
      return res.status(400).json({
        msg: "Credenciales incorrectas.",
      });
    }

    const validatePassword = bcryptjs.compareSync(password, user.password);

    if (!validatePassword) {
      return res.status(400).json({
        msg: "Credenciales incorrectas.",
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
    console.error("Error en login:", error);
    res.status(500).json({
      msg: "Error, por favor intente en unos minutos.",
    });
  }
};

module.exports = { register, login };