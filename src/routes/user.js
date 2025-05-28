const { Router } = require("express");
const fieldsValidator = require("../middlewares/fields");
const { emailPatch, passwordPatch, namePatch, phonePatch, userGet, profilePicturePost } = require("../controllers/user");
const { check } = require("express-validator");
const jwtValidation = require("../middlewares/jwt_validation");

const router = Router();

router.get('/user', [jwtValidation], userGet)

router.patch(
  "/name",
  [
    check("firstName", "El nombre es obligatorio.").notEmpty(),
    check("lastName", "El apellido es obligatorio.").notEmpty(),
    jwtValidation,
    fieldsValidator,
  ],
  namePatch
);

router.patch(
  "/email",
  [
    check("email", "El correo es obligatorio.").notEmpty(),
    check("email", "El formato del correo no es correcto.").isEmail(),
    jwtValidation,
    fieldsValidator,
  ],
  emailPatch
);

router.patch(
  "/password",
  [
    check("password", "La contraseña es obligatoria.").notEmpty(),
    check(
      "password",
      "La contraseña debe contener de 8 a 16 caracteres."
    ).isLength({
      min: 8,
      max: 16,
    }),
    jwtValidation,
    fieldsValidator,
  ],
  passwordPatch
);

router.patch(
  "/phone",
  [
    check("phone", "El número de telefono es obligatorio.").notEmpty(),
    check("phone", "El número de telefono debe contener 11 digitos.").isLength({
      min: 11,
      max: 11,
    }),
    jwtValidation,
    fieldsValidator,
  ],
  phonePatch
);

router.post(
  "/profilePicture",
  [
    jwtValidation,
  ],
  profilePicturePost
);

module.exports = router;
