const { Router } = require("express");
const jwtValidation = require("../middlewares/jwt_validation");
const { favoritesPost, favoritesGet } = require("../controllers/favorites");
const fieldsValidator = require("../middlewares/fields");
const { check } = require("express-validator");

const router = Router();

router.post(
  "/",
  [
    check("postId", "El id del post es obligatorio.").notEmpty(),
    jwtValidation,
    fieldsValidator,
  ],
  favoritesPost
);
router.get("/", [jwtValidation], favoritesGet);

module.exports = router;
