const { Router } = require("express");
const { check } = require("express-validator");
const fieldsValidator = require("../middlewares/fields");
const { register, login } = require("../controllers/auth");

const router = Router();

router.post(
  "/register",
  [
    check("email", "El correo es obligatorio.").notEmpty(),
    check("email", "El formato del correo no es correcto.").isEmail(),
    check("password", "La contraseña es obligatoria.").notEmpty(),
    check(
      "password",
      "La contraseña debe contener de 8 a 16 caracteres."
    ).isLength({
      min: 8,
      max: 16,
    }),
    check("firstName", "El nombre es obligatorio.").notEmpty(),
    check("lastName", "El apellido es obligatorio.").notEmpty(),
    check("bio", "La fecha de cumpleaños es obligatoria.").notEmpty(),
    check("phone", "El número de telefono es obligatorio.").notEmpty(),
    check("phone", "El número de telefono debe contener 11 digitos.").isLength({
      min: 11,
      max: 11,
    }),
    fieldsValidator,
  ],
  register
);
router.post(
  "/login",
  [
    check("email", "El correo es obligatorio.").notEmpty(),
    check("email", "El formato del correo no es correcto.").isEmail(),
    check("password", "La contraseña es obligatoria.").notEmpty(),
    check(
      "password",
      "La contraseña debe contener de 8 a 16 caracteres."
    ).isLength({
      min: 8,
      max: 16,
    }),
    fieldsValidator,
  ],
  login
);

module.exports = router;
