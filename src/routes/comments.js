const { Router } = require("express");
const jwtValidation = require("../middlewares/jwt_validation");
const { commentPost, commentGet } = require("../controllers/comments");
const fieldsValidator = require("../middlewares/fields");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/",
  [
    check("postId", "El id del post es obligatorio.").notEmpty(),
    check("content", "El contenido del comentario es obligatorio.").notEmpty(),
    jwtValidation,
    fieldsValidator,
  ],
  commentPost
);

router.get(
  "/",
  [
    check("postId", "El id del post es obligatorio.").notEmpty(),
    jwtValidation,
    fieldsValidator,
  ],
  commentGet
);

module.exports = router;
